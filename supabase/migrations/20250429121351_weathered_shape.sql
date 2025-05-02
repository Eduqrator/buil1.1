/*
  # Add additional course fields

  1. Changes
    - Add affiliate_link column to courses table
    - Add learning_outcomes column to courses table
    - Add certificate column to courses table

  2. Security
    - No changes to existing policies
*/

ALTER TABLE courses
ADD COLUMN IF NOT EXISTS affiliate_link text,
ADD COLUMN IF NOT EXISTS learning_outcomes text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS certificate boolean DEFAULT false;