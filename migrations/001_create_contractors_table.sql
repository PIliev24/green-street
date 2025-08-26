-- Create contractors table
CREATE TABLE contractors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security)
ALTER TABLE contractors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read contractors
CREATE POLICY "Anyone can view contractors" ON contractors
    FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX idx_contractors_name ON contractors (name);
CREATE INDEX idx_contractors_created_at ON contractors (created_at);
