/*
  # Create AI Generations Table

  1. New Tables
    - `ai_generations`
      - `id` (uuid, primary key) - Unique generation record ID
      - `user_id` (uuid, foreign key to auth.users) - The user who created the generation
      - `type` (text) - Either 'text' or 'image'
      - `prompt` (text) - The input prompt for generation
      - `result` (text) - The generated text content or image URL
      - `status` (text) - One of 'pending', 'completed', 'failed'
      - `error_message` (text, nullable) - Error details if generation failed
      - `created_at` (timestamptz) - When the generation was created

  2. Security
    - Enable RLS on `ai_generations` table
    - Add policy for authenticated users to read their own generations
    - Add policy for authenticated users to insert their own generations
    - Add policy for authenticated users to update their own generations
    - Add policy for authenticated users to delete their own generations

  3. Important Notes
    - The `type` column uses a text check constraint to enforce 'text' or 'image' values
    - The `status` column uses a text check constraint to enforce 'pending', 'completed', or 'failed' values
    - An index is added on `user_id` for faster queries by user
*/

CREATE TABLE IF NOT EXISTS ai_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'image')),
  prompt text NOT NULL,
  result text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  error_message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_ai_generations_user_id ON ai_generations(user_id);

CREATE POLICY "Users can read own generations"
  ON ai_generations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generations"
  ON ai_generations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generations"
  ON ai_generations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own generations"
  ON ai_generations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
