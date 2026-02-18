-- Add onboarding_completed column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;

-- Create storage bucket for identity documents if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('identity_documents', 'identity_documents', false)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for identity_documents bucket
-- Allow users to upload their own NIN slips
CREATE POLICY "Users can upload their own NIN slips"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'identity_documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to view their own NIN slips
CREATE POLICY "Users can view their own NIN slips"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'identity_documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
