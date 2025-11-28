-- Create usernames table for custom URL slugs
CREATE TABLE IF NOT EXISTS usernames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_usernames_user_id ON usernames(user_id);
CREATE INDEX IF NOT EXISTS idx_usernames_username ON usernames(username);

-- Enable RLS
ALTER TABLE usernames ENABLE ROW LEVEL SECURITY;

-- Policy to allow service role full access
CREATE POLICY "Service role has full access to usernames"
  ON usernames
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Policy to allow public read access for username lookups
CREATE POLICY "Public can read usernames"
  ON usernames
  FOR SELECT
  USING (true);
