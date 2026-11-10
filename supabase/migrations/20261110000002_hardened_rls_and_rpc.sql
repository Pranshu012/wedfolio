-- ==============================================================================
-- WEDFOLIO MIGRATION 002: Hardened Row Level Security & Transactional RPCs
-- Version: 1.1.2
-- ==============================================================================

-- 1. SECURITY DEFINER HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.check_is_workspace_member(p_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.workspace_members wm
        WHERE wm.workspace_id = p_workspace_id
          AND wm.user_id = auth.uid()
    );
$$;

CREATE OR REPLACE FUNCTION public.check_is_workspace_editor(p_workspace_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT EXISTS (
        SELECT 1 
        FROM public.workspace_members wm
        WHERE wm.workspace_id = p_workspace_id
          AND wm.user_id = auth.uid()
          AND wm.role IN ('owner', 'editor')
    );
$$;

REVOKE ALL ON FUNCTION public.check_is_workspace_member(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_is_workspace_member(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.check_is_workspace_editor(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_is_workspace_editor(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.get_public_wedding(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_wedding(TEXT) TO anon, authenticated;

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.published_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 3. PROFILES POLICIES
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- 4. WORKSPACES POLICIES
DROP POLICY IF EXISTS "Members can view their workspaces" ON public.workspaces;
CREATE POLICY "Members can view their workspaces"
    ON public.workspaces FOR SELECT
    TO authenticated
    USING (public.check_is_workspace_member(id));

DROP POLICY IF EXISTS "Owners can update workspace" ON public.workspaces;
CREATE POLICY "Owners can update workspace"
    ON public.workspaces FOR UPDATE
    TO authenticated
    USING (owner_id = auth.uid())
    WITH CHECK (owner_id = auth.uid());

-- 5. WORKSPACE MEMBERS POLICIES
DROP POLICY IF EXISTS "Members can view membership list" ON public.workspace_members;
CREATE POLICY "Members can view membership list"
    ON public.workspace_members FOR SELECT
    TO authenticated
    USING (public.check_is_workspace_member(workspace_id));

-- 6. WEDDINGS POLICIES (Drafts are strictly private)
DROP POLICY IF EXISTS "Members can view wedding drafts" ON public.weddings;
CREATE POLICY "Members can view wedding drafts"
    ON public.weddings FOR SELECT
    TO authenticated
    USING (public.check_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS "Editors can insert weddings" ON public.weddings;
CREATE POLICY "Editors can insert weddings"
    ON public.weddings FOR INSERT
    TO authenticated
    WITH CHECK (public.check_is_workspace_editor(workspace_id));

DROP POLICY IF EXISTS "Editors can update weddings" ON public.weddings;
CREATE POLICY "Editors can update weddings"
    ON public.weddings FOR UPDATE
    TO authenticated
    USING (public.check_is_workspace_editor(workspace_id))
    WITH CHECK (public.check_is_workspace_editor(workspace_id));

-- 7. PUBLISHED SNAPSHOTS ACCESS CONTROL
-- Revoke direct mutation grants
REVOKE INSERT, UPDATE, DELETE ON public.published_snapshots FROM anon, authenticated;
REVOKE SELECT ON public.published_snapshots FROM anon;

-- Workspace members can view snapshot history for their workspace
DROP POLICY IF EXISTS "Members can view workspace snapshots" ON public.published_snapshots;
CREATE POLICY "Members can view workspace snapshots"
    ON public.published_snapshots FOR SELECT
    TO authenticated
    USING (public.check_is_workspace_member(workspace_id));

GRANT SELECT ON public.public_wedding_view TO anon, authenticated;

-- 8. MEDIA ASSETS POLICIES
DROP POLICY IF EXISTS "Public can view published bucket media" ON public.media_assets;
CREATE POLICY "Public can view published bucket media"
    ON public.media_assets FOR SELECT
    TO anon, authenticated
    USING (storage_bucket = 'wedding-published');

DROP POLICY IF EXISTS "Members can view workspace media" ON public.media_assets;
CREATE POLICY "Members can view workspace media"
    ON public.media_assets FOR SELECT
    TO authenticated
    USING (public.check_is_workspace_member(workspace_id));

DROP POLICY IF EXISTS "Editors can insert media" ON public.media_assets;
CREATE POLICY "Editors can insert media"
    ON public.media_assets FOR INSERT
    TO authenticated
    WITH CHECK (public.check_is_workspace_editor(workspace_id));

DROP POLICY IF EXISTS "Editors can delete media" ON public.media_assets;
CREATE POLICY "Editors can delete media"
    ON public.media_assets FOR DELETE
    TO authenticated
    USING (public.check_is_workspace_editor(workspace_id));

-- 9. SNAPSHOT IMMUTABILITY TRIGGER
CREATE OR REPLACE FUNCTION public.enforce_snapshot_immutability()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    -- Allow updating ONLY the 'is_current' boolean flag
    IF (OLD.id = NEW.id AND 
        OLD.wedding_id = NEW.wedding_id AND
        OLD.workspace_id = NEW.workspace_id AND
        OLD.slug = NEW.slug AND
        OLD.template_id = NEW.template_id AND
        OLD.template_version = NEW.template_version AND
        OLD.public_content_snapshot = NEW.public_content_snapshot AND
        OLD.theme_snapshot = NEW.theme_snapshot AND
        OLD.version_number = NEW.version_number AND
        OLD.published_by = NEW.published_by AND
        OLD.published_at = NEW.published_at) THEN
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Published snapshots are immutable. Content cannot be updated.';
    END IF;
END;
$$;

DROP TRIGGER IF EXISTS trg_snapshot_immutability ON public.published_snapshots;
CREATE TRIGGER trg_snapshot_immutability
BEFORE UPDATE ON public.published_snapshots
FOR EACH ROW
EXECUTE FUNCTION public.enforce_snapshot_immutability();

-- 10. TRANSACTIONAL PUBLISHING RPCs
CREATE OR REPLACE FUNCTION public.publish_wedding_snapshot(
    p_wedding_id UUID,
    p_public_content JSONB,
    p_theme_config JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_workspace_id UUID;
    v_slug TEXT;
    v_template_id TEXT;
    v_template_version TEXT;
    v_next_version INTEGER;
    v_new_snapshot_id UUID;
BEGIN
    -- 1. Row-lock wedding draft
    SELECT workspace_id, slug, active_template_id, template_version
    INTO v_workspace_id, v_slug, v_template_id, v_template_version
    FROM public.weddings
    WHERE id = p_wedding_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Wedding draft not found';
    END IF;

    -- 2. Authorization check
    IF NOT public.check_is_workspace_editor(v_workspace_id) THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not a workspace editor';
    END IF;

    -- 3. Next version number
    SELECT COALESCE(pg_catalog.max(version_number), 0) + 1
    INTO v_next_version
    FROM public.published_snapshots
    WHERE wedding_id = p_wedding_id;

    -- 4. Deactivate prior snapshots
    UPDATE public.published_snapshots
    SET is_current = false
    WHERE wedding_id = p_wedding_id AND is_current = true;

    -- 5. Insert new immutable snapshot
    INSERT INTO public.published_snapshots (
        wedding_id,
        workspace_id,
        slug,
        template_id,
        template_version,
        public_content_snapshot,
        theme_snapshot,
        version_number,
        is_current,
        published_by,
        published_at
    ) VALUES (
        p_wedding_id,
        v_workspace_id,
        v_slug,
        v_template_id,
        v_template_version,
        p_public_content,
        p_theme_config,
        v_next_version,
        true,
        auth.uid(),
        pg_catalog.now()
    )
    RETURNING id INTO v_new_snapshot_id;

    -- 6. Update wedding status to 'published'
    UPDATE public.weddings
    SET status = 'published',
        updated_at = pg_catalog.now()
    WHERE id = p_wedding_id;

    RETURN v_new_snapshot_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.unpublish_wedding(p_wedding_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_workspace_id UUID;
BEGIN
    SELECT workspace_id INTO v_workspace_id
    FROM public.weddings
    WHERE id = p_wedding_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Wedding not found';
    END IF;

    IF NOT public.check_is_workspace_editor(v_workspace_id) THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not a workspace editor';
    END IF;

    -- Deactivate current snapshots
    UPDATE public.published_snapshots
    SET is_current = false
    WHERE wedding_id = p_wedding_id AND is_current = true;

    -- Set status back to draft
    UPDATE public.weddings
    SET status = 'draft',
        updated_at = pg_catalog.now()
    WHERE id = p_wedding_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.rollback_wedding_snapshot(
    p_wedding_id UUID,
    p_target_snapshot_id UUID
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_workspace_id UUID;
BEGIN
    SELECT workspace_id INTO v_workspace_id
    FROM public.weddings
    WHERE id = p_wedding_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Wedding not found';
    END IF;

    IF NOT public.check_is_workspace_editor(v_workspace_id) THEN
        RAISE EXCEPTION 'Unauthorized: Caller is not a workspace editor';
    END IF;

    -- Verify the target snapshot belongs to this wedding and workspace
    IF NOT EXISTS (
        SELECT 1 FROM public.published_snapshots
        WHERE id = p_target_snapshot_id
          AND wedding_id = p_wedding_id
          AND workspace_id = v_workspace_id
    ) THEN
        RAISE EXCEPTION 'Target snapshot does not belong to this wedding';
    END IF;

    -- Atomically switch active snapshot
    UPDATE public.published_snapshots
    SET is_current = (id = p_target_snapshot_id)
    WHERE wedding_id = p_wedding_id;

    UPDATE public.weddings
    SET status = 'published',
        updated_at = pg_catalog.now()
    WHERE id = p_wedding_id;
END;
$$;

-- 11. WORKSPACE BOOTSTRAP FUNCTION
CREATE OR REPLACE FUNCTION public.bootstrap_user_workspace(
    p_workspace_name TEXT,
    p_workspace_slug TEXT,
    p_full_name TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_user_id UUID;
    v_email TEXT;
    v_workspace_id UUID;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;

    SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;

    -- 1. Ensure profile exists
    INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
    VALUES (v_user_id, v_email, p_full_name, pg_catalog.now(), pg_catalog.now())
    ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        updated_at = pg_catalog.now();

    -- 2. Create workspace
    INSERT INTO public.workspaces (name, slug, owner_id, type, created_at, updated_at)
    VALUES (p_workspace_name, p_workspace_slug, v_user_id, 'couple', pg_catalog.now(), pg_catalog.now())
    RETURNING id INTO v_workspace_id;

    -- 3. Create owner membership
    INSERT INTO public.workspace_members (workspace_id, user_id, role, created_at)
    VALUES (v_workspace_id, v_user_id, 'owner', pg_catalog.now());

    RETURN v_workspace_id;
END;
$$;

REVOKE ALL ON FUNCTION public.publish_wedding_snapshot(UUID, JSONB, JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.publish_wedding_snapshot(UUID, JSONB, JSONB) TO authenticated;

REVOKE ALL ON FUNCTION public.unpublish_wedding(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.unpublish_wedding(UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.rollback_wedding_snapshot(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rollback_wedding_snapshot(UUID, UUID) TO authenticated;

REVOKE ALL ON FUNCTION public.bootstrap_user_workspace(TEXT, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bootstrap_user_workspace(TEXT, TEXT, TEXT) TO authenticated;
