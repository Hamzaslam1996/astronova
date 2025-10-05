-- Update data_sources table to canonical schema
-- First, make url and chart_type nullable
ALTER TABLE public.data_sources ALTER COLUMN url DROP NOT NULL;
ALTER TABLE public.data_sources ALTER COLUMN chart_type DROP NOT NULL;

-- Add new columns
ALTER TABLE public.data_sources
  ADD COLUMN IF NOT EXISTS slug text UNIQUE,
  ADD COLUMN IF NOT EXISTS base_url text,
  ADD COLUMN IF NOT EXISTS auth_type text DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS secret_name text,
  ADD COLUMN IF NOT EXISTS cadence_sec integer DEFAULT 600,
  ADD COLUMN IF NOT EXISTS enabled boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS last_status text,
  ADD COLUMN IF NOT EXISTS last_error text;

-- Migrate existing url column to base_url if data exists
UPDATE public.data_sources SET base_url = url WHERE base_url IS NULL AND url IS NOT NULL;

-- Make base_url required
ALTER TABLE public.data_sources ALTER COLUMN base_url SET NOT NULL;

-- Make name and type required
ALTER TABLE public.data_sources
  ALTER COLUMN name SET NOT NULL,
  ALTER COLUMN type SET NOT NULL;

-- Seed canonical data sources
INSERT INTO public.data_sources (slug, name, type, base_url, auth_type, cadence_sec, enabled)
VALUES 
  ('launch-library', 'Launch Library 2 (upcoming launches)', 'json', 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20&mode=detailed', 'none', 600, true),
  ('celestrak-active', 'CelesTrak Active Satellites (GP CSV)', 'csv', 'https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=csv', 'none', 86400, true)
ON CONFLICT (slug) DO NOTHING;