-- Create enum type for resume status
DO $$ BEGIN
  CREATE TYPE resume_status AS ENUM ('draft', 'live');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  status resume_status DEFAULT 'draft',
  file_name TEXT,
  file_url TEXT,
  file_size INTEGER,
  file_content TEXT,
  resume_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resumes (using user_id text column matching Clerk user ID)
-- Since we're using Clerk auth, we'll use a service role for all operations
-- and handle authorization at the application level

-- Policy to allow service role full access (for server-side operations)
CREATE POLICY "Service role has full access to resumes"
  ON resumes
  FOR ALL
  USING (true)
  WITH CHECK (true);
