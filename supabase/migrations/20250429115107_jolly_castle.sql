/*
  # Add Initial Admin Users

  1. Changes
    - Insert initial admin users
    - Add admin management policy

  2. Security
    - Only super admins can manage other admins
*/

-- Insert initial admin users
INSERT INTO admins (email, role)
VALUES 
  ('admin@eduqrator.com', 'super_admin')
ON CONFLICT (email) DO NOTHING;

-- Add policy for super admins to manage other admins
CREATE POLICY "Super admins can manage other admins"
  ON admins
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'email') IN (
      SELECT email FROM admins WHERE role = 'super_admin'
    )
  )
  WITH CHECK (
    (auth.jwt() ->> 'email') IN (
      SELECT email FROM admins WHERE role = 'super_admin'
    )
  );