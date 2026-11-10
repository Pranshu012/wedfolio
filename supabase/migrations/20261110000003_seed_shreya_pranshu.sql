-- ==============================================================================
-- WEDFOLIO MIGRATION 003: Seed Shreya & Pranshu Royal Wedding
-- Version: 1.1.2
-- ==============================================================================

DO $$
DECLARE
    v_profile_id UUID := '00000000-0000-0000-0000-000000000001';
    v_workspace_id UUID := 'a0000000-0000-0000-0000-000000000001';
    v_wedding_id UUID := 'b0000000-0000-0000-0000-000000000001';
    v_snapshot_id UUID := 'c0000000-0000-0000-0000-000000000001';
    v_public_content JSONB;
    v_theme_config JSONB;
BEGIN
    -- 1. Seed Profile (Placeholder profile for seed execution)
    INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
    VALUES (
        v_profile_id,
        'pranshu@wedfolio.com',
        'Pranshu & Shreya',
        pg_catalog.now(),
        pg_catalog.now()
    )
    ON CONFLICT (id) DO NOTHING;

    -- 2. Seed Personal Workspace
    INSERT INTO public.workspaces (id, slug, name, type, owner_id, created_at, updated_at)
    VALUES (
        v_workspace_id,
        'pranshu-shreya',
        'The Royal Wedding of Shreya & Pranshu',
        'couple',
        v_profile_id,
        pg_catalog.now(),
        pg_catalog.now()
    )
    ON CONFLICT (id) DO NOTHING;

    -- 3. Seed Membership
    INSERT INTO public.workspace_members (workspace_id, user_id, role, created_at)
    VALUES (
        v_workspace_id,
        v_profile_id,
        'owner',
        pg_catalog.now()
    )
    ON CONFLICT (workspace_id, user_id) DO NOTHING;

    -- 4. Construct Initial Content & Theme
    v_theme_config := '{
        "primaryColor": "#5B0E2D",
        "secondaryColor": "#0B3C2D",
        "accentColor": "#D4AF37",
        "backgroundColor": "#FDFBF7",
        "fontHeading": "Cinzel, serif",
        "fontBody": "Cormorant Garamond, serif",
        "fontScript": "Great Vibes, cursive"
    }'::jsonb;

    v_public_content := '{
        "weddingTitle": "The Royal Wedding of Shreya & Pranshu",
        "slug": "shreya-pranshu",
        "eventDate": "2026-12-12",
        "eventStartTime": "18:00",
        "timezone": "Asia/Kolkata",
        "couple": {
            "bride": {
                "fullName": "Shreya",
                "bio": "A graceful soul with an infectious smile, bringing elegance, laughter, and light into every room she enters.",
                "avatarUrl": "/static/shreya-portrait.webp"
            },
            "groom": {
                "fullName": "Pranshu",
                "bio": "A visionary thinker with a compassionate heart, deeply devoted to building a wondrous life and shared adventures.",
                "avatarUrl": "/static/pranshu-portrait.webp"
            },
            "story": "Two hearts brought together by destiny, nurtured by shared laughter, boundless dreams, and a royal celebration of lifelong love."
        },
        "family": [
            {
                "name": "Dr. Rajesh & Mrs. Sunita Sharma",
                "relation": "Parents of the Bride",
                "side": "bride",
                "blessingMessage": "With abundant blessings and joy as our beloved daughter embarks on her grand journey of eternal love."
            },
            {
                "name": "Aarav Sharma",
                "relation": "Brother of the Bride",
                "side": "bride",
                "blessingMessage": "Wishing my sister and Pranshu a lifetime of magical moments and laughter."
            },
            {
                "name": "Mr. Anil & Mrs. Rekha Gupta",
                "relation": "Parents of the Groom",
                "side": "groom",
                "blessingMessage": "Welcoming our dear Shreya into our hearts and family with open arms, blessings, and imperial celebration."
            },
            {
                "name": "Rohan Gupta",
                "relation": "Brother of the Groom",
                "side": "groom",
                "blessingMessage": "Cheers to my brother and new sister Shreya. May your bond grow stronger with each passing sunrise."
            }
        ],
        "schedule": [
            {
                "id": "haldi",
                "name": "Shubh Haldi & Phoolon Ki Holi",
                "date": "2026-12-11",
                "startTime": "10:00 AM",
                "venueName": "The Courtyard Gardens",
                "description": "A radiant morning filled with turmeric blessings, marigold petals, and joyous folk melodies.",
                "dressCode": "Sunshine Yellow & Festive Traditional"
            },
            {
                "id": "mehendi-sangeet",
                "name": "Royal Mehendi & Sangeet Utsav",
                "date": "2026-12-11",
                "startTime": "06:30 PM",
                "venueName": "The Grand Ballroom & Amphitheatre",
                "description": "An evening of intricate henna art, scintillating musical performances, and royal ballroom celebration.",
                "dressCode": "Regal Emerald & Glamorous Cocktail"
            },
            {
                "id": "varmala-pheras",
                "name": "The Royal Varmala & Vedic Pheras",
                "date": "2026-12-12",
                "startTime": "05:00 PM",
                "venueName": "The Palace Mandapam",
                "description": "The sacred union amidst Vedic chants, floral shower, and exchange of royal garlands at twilight.",
                "dressCode": "Imperial Royal Traditional (Sherwani & Lehengas)"
            },
            {
                "id": "reception",
                "name": "The Grand Imperial Gala Reception",
                "date": "2026-12-13",
                "startTime": "07:30 PM",
                "venueName": "The Crystal Palace Gardens",
                "description": "A magnificent starlit banquet celebrating the newlyweds with imperial delicacies and live orchestral harmony.",
                "dressCode": "Black Tie / Royal Formal"
            }
        ],
        "isVenueEnabled": true,
        "venue": {
            "name": "The Royal Palace & Heritage Gardens",
            "address": "Heritage Palace Estate, Palace Road, Civil Lines",
            "city": "Jaipur",
            "state": "Rajasthan",
            "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113911.08272998782!2d75.71960244795325!3d26.912433644265415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db479f9d19727%3A0x68818205f7332fb7!2sCity%20Palace%2C%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
            "directionsUrl": "https://maps.google.com/?q=City+Palace+Jaipur",
            "coordinates": {
                "lat": 26.9258,
                "lng": 75.8237
            }
        },
        "gallery": [
            {
                "url": "/static/gallery-1.webp",
                "caption": "A shared glance of infinite tomorrow",
                "aspectRatio": "4:5"
            },
            {
                "url": "/static/gallery-2.webp",
                "caption": "Imperial heritage & timeless celebration",
                "aspectRatio": "4:5"
            },
            {
                "url": "/static/gallery-3.webp",
                "caption": "Laughter captured beneath palace arches",
                "aspectRatio": "4:5"
            },
            {
                "url": "/static/gallery-4.webp",
                "caption": "Hand in hand towards our grand chapter",
                "aspectRatio": "4:5"
            }
        ],
        "interactive": {
            "envelopeSealText": "S & P",
            "scratchDateText": "Save The Date: 12th December 2026",
            "backgroundMusicUrl": "/audio/royal-sitar-harmony.mp3",
            "musicTitle": "Royal Shehnai & Sitar Harmony"
        }
    }'::jsonb;

    -- 5. Seed Wedding Draft
    INSERT INTO public.weddings (
        id,
        workspace_id,
        slug,
        title,
        status,
        active_template_id,
        template_version,
        event_date,
        event_start_time,
        timezone,
        couple_data,
        family_data,
        schedule_data,
        venue_data,
        is_venue_enabled,
        gallery_data,
        interactive_config,
        theme_customization,
        created_at,
        updated_at
    ) VALUES (
        v_wedding_id,
        v_workspace_id,
        'shreya-pranshu',
        'The Royal Wedding of Shreya & Pranshu',
        'published',
        'royal-heritage',
        '1.0.0',
        '2026-12-12'::date,
        '18:00'::time,
        'Asia/Kolkata',
        v_public_content->'couple',
        v_public_content->'family',
        v_public_content->'schedule',
        v_public_content->'venue',
        true,
        v_public_content->'gallery',
        v_public_content->'interactive',
        v_theme_config,
        pg_catalog.now(),
        pg_catalog.now()
    )
    ON CONFLICT (id) DO UPDATE
    SET status = 'published',
        updated_at = pg_catalog.now();

    -- 6. Seed Initial Published Snapshot
    INSERT INTO public.published_snapshots (
        id,
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
        v_snapshot_id,
        v_wedding_id,
        v_workspace_id,
        'shreya-pranshu',
        'royal-heritage',
        '1.0.0',
        v_public_content,
        v_theme_config,
        1,
        true,
        v_profile_id,
        pg_catalog.now()
    )
    ON CONFLICT (id) DO NOTHING;

END $$;
