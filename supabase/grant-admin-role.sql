-- Helper script to grant admin role to a user
-- Replace 'user-email@example.com' with the actual user email

-- First, get the user ID from their email
DO $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Replace this email with the user you want to make admin
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = 'user-email@example.com';

  IF target_user_id IS NULL THEN
    RAISE NOTICE 'User not found with that email';
  ELSE
    -- Insert admin role for the user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (target_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role granted to user: %', target_user_id;
  END IF;
END $$;
