-- Fix Critical Security Issues
-- Issue 1: data_sources table exposes secret_name to anonymous users  
-- Issue 2: profiles table claims to require auth but doesn't

-- Fix data_sources table - require authentication for viewing
DROP POLICY IF EXISTS "Anyone can view data sources" ON public.data_sources;

CREATE POLICY "Authenticated users can view data sources"
ON public.data_sources
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Fix profiles table - actually require authentication (was using 'true')
DROP POLICY IF EXISTS "Authenticated users can view all profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Note: PostgreSQL RLS cannot exclude specific columns like secret_name
-- Application layer should filter sensitive fields for non-admin users
-- or consider creating a view without secret_name for general access