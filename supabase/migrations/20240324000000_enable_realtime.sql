-- Enable real-time for the profiles table
begin;
  -- remove the table from publication if it exists to avoid errors
  alter publication supabase_realtime disable table public.profiles;
  -- add it (or re-add it) to the publication
  alter publication supabase_realtime add table public.profiles;
commit;
