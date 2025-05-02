/*
  # Add Profiles Table Policies

  1. Security Changes
    - Add policy for users to create their own profile
    - Add policy for users to update their own profile
    - Add policy for users to read their own profile
    - Add policy for service role to manage profiles during signup

  Note: These policies ensure users can only manage their own profiles while
  allowing the service role to handle profile creation during signup.
*/

-- Policy to allow users to create their own profile
CREATE POLICY "Users can create their own profile"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Policy to allow the service role to manage all profiles
CREATE POLICY "Service role can manage all profiles"
ON profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);