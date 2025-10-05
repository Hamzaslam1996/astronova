-- Drop the existing public SELECT policy on profiles
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create a new policy that only allows authenticated users to view profiles
CREATE POLICY "Authenticated users can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Optional: If you want even stricter security, users can only view their own profile
-- Uncomment the policy below and comment out the one above
-- CREATE POLICY "Users can view their own profile"
-- ON public.profiles
-- FOR SELECT
-- TO authenticated
-- USING (auth.uid() = user_id);