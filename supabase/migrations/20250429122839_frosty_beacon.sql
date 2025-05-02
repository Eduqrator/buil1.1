/*
  # Update profiles table RLS policies

  1. Changes
    - Add new RLS policy to allow profile creation during signup
    - Modify existing policies to be more permissive for authenticated users
  
  2. Security
    - Maintains security by ensuring users can only create their own profile
    - Service role retains full access
    - Public users cannot access profiles
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON profiles;

-- Recreate policies with correct permissions
CREATE POLICY "Service role can manage all profiles"
ON profiles FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Users can create their own profile"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);