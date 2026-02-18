-- Create the identity_documents bucket if it doesn't exist
-- We set it to public: true for now so the getPublicUrl() used in the frontend works.
-- In a high-security production environment, this would be private with Signed URLs.
INSERT INTO storage.buckets (id, name, public)
VALUES ('identity_documents', 'identity_documents', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Ensure storage policies are correctly set
-- Allow any authenticated user to upload to their own folder
DROP POLICY IF EXISTS "Users can upload their own NIN slips" ON storage.objects;
CREATE POLICY "Users can upload their own NIN slips"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'identity_documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to view all documents
DROP POLICY IF EXISTS "Admins can view all NIN slips" ON storage.objects;
CREATE POLICY "Admins can view all NIN slips"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'identity_documents' AND
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Allow users to view their own documents
DROP POLICY IF EXISTS "Users can view their own NIN slips" ON storage.objects;
CREATE POLICY "Users can view their own NIN slips"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'identity_documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
