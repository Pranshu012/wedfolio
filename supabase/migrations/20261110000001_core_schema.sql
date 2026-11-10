-- ==============================================================================
-- WEDFOLIO MIGRATION 001: Core Schema & Structural Integrity
-- Version: 1.1.2
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- 2. WORKSPACES (Multi-Tenant Anchor)
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'couple' CHECK (type IN ('couple', 'planner')),
    owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

CREATE INDEX IF NOT EXISTS idx_workspaces_slug ON public.workspaces(slug);

-- 3. WORKSPACE MEMBERS
CREATE TABLE IF NOT EXISTS public.workspace_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    CONSTRAINT unique_workspace_user UNIQUE (workspace_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_user ON public.workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspace_members_ws ON public.workspace_members(workspace_id);

-- 4. WEDDINGS (Draft Datastore with Composite Anchor)
CREATE TABLE IF NOT EXISTS public.weddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    active_template_id TEXT NOT NULL DEFAULT 'royal-heritage',
    template_version TEXT NOT NULL DEFAULT '1.0.0',
    -- Local date modeling
    event_date DATE NOT NULL,
    event_start_time TIME,
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    -- Structured JSONB sections
    couple_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    family_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    schedule_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    venue_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_venue_enabled BOOLEAN NOT NULL DEFAULT false,
    gallery_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    interactive_config JSONB NOT NULL DEFAULT '{}'::jsonb,
    theme_customization JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    -- Enforce composite tenant integrity
    CONSTRAINT uq_wedding_workspace UNIQUE (id, workspace_id)
);

CREATE INDEX IF NOT EXISTS idx_weddings_workspace ON public.weddings(workspace_id);
CREATE INDEX IF NOT EXISTS idx_weddings_slug ON public.weddings(slug);

-- 5. PUBLISHED SNAPSHOTS (Immutable Guest Store)
CREATE TABLE IF NOT EXISTS public.published_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wedding_id UUID NOT NULL,
    workspace_id UUID NOT NULL,
    slug TEXT NOT NULL,
    template_id TEXT NOT NULL,
    template_version TEXT NOT NULL,
    public_content_snapshot JSONB NOT NULL,
    theme_snapshot JSONB NOT NULL,
    version_number INTEGER NOT NULL DEFAULT 1,
    is_current BOOLEAN NOT NULL DEFAULT false,
    published_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    published_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    -- Composite Foreign Key ensures tenant isolation
    CONSTRAINT fk_snapshot_wedding_workspace 
        FOREIGN KEY (wedding_id, workspace_id) 
        REFERENCES public.weddings(id, workspace_id) ON DELETE CASCADE,
    CONSTRAINT uq_wedding_version UNIQUE (wedding_id, version_number)
);

-- Unique partial indexes
CREATE UNIQUE INDEX IF NOT EXISTS uq_single_current_snapshot_per_wedding 
    ON public.published_snapshots(wedding_id) 
    WHERE is_current = true;

CREATE UNIQUE INDEX IF NOT EXISTS uq_single_current_snapshot_per_slug 
    ON public.published_snapshots(slug) 
    WHERE is_current = true;

CREATE INDEX IF NOT EXISTS idx_snapshots_lookup 
    ON public.published_snapshots(slug) 
    WHERE is_current = true;

-- 6. MEDIA ASSETS (Preserving workspace_id on wedding deletion)
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    wedding_id UUID,
    storage_bucket TEXT NOT NULL DEFAULT 'wedding-drafts' CHECK (storage_bucket IN ('wedding-drafts', 'wedding-published')),
    storage_path TEXT NOT NULL UNIQUE,
    public_url TEXT,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp', 'audio/mpeg')),
    file_size_bytes INTEGER NOT NULL CHECK (file_size_bytes > 0 AND file_size_bytes <= 10485760),
    width INTEGER,
    height INTEGER,
    alt_text TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    CONSTRAINT fk_media_wedding 
        FOREIGN KEY (wedding_id) 
        REFERENCES public.weddings(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_media_workspace ON public.media_assets(workspace_id);
CREATE INDEX IF NOT EXISTS idx_media_bucket ON public.media_assets(storage_bucket);

-- Media Tenant Integrity Trigger
CREATE OR REPLACE FUNCTION public.check_media_asset_tenant()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
    v_wedding_ws UUID;
BEGIN
    IF NEW.wedding_id IS NOT NULL THEN
        SELECT workspace_id INTO v_wedding_ws 
        FROM public.weddings 
        WHERE id = NEW.wedding_id;

        IF v_wedding_ws IS NULL OR v_wedding_ws <> NEW.workspace_id THEN
            RAISE EXCEPTION 'Cross-tenant violation: media workspace_id does not match wedding workspace_id';
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_verify_media_tenant ON public.media_assets;
CREATE TRIGGER trg_verify_media_tenant
BEFORE INSERT OR UPDATE ON public.media_assets
FOR EACH ROW
EXECUTE FUNCTION public.check_media_asset_tenant();

-- 7. RESTRICTED PUBLIC GUEST VIEW
CREATE OR REPLACE VIEW public.public_wedding_view AS
SELECT 
    ps.slug,
    ps.template_id,
    ps.template_version,
    ps.public_content_snapshot AS content,
    ps.theme_snapshot AS theme,
    ps.published_at
FROM public.published_snapshots ps
WHERE ps.is_current = true;

-- 8. RESTRICTED PUBLIC RPC FUNCTION
CREATE OR REPLACE FUNCTION public.get_public_wedding(p_slug TEXT)
RETURNS TABLE (
    slug TEXT,
    template_id TEXT,
    template_version TEXT,
    content JSONB,
    theme JSONB,
    published_at TIMESTAMPTZ
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
    SELECT 
        ps.slug,
        ps.template_id,
        ps.template_version,
        ps.public_content_snapshot,
        ps.theme_snapshot,
        ps.published_at
    FROM public.published_snapshots ps
    WHERE ps.slug = p_slug
      AND ps.is_current = true
    LIMIT 1;
$$;
