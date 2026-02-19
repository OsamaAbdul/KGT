-- Refresh the public_profiles view to ensure it includes all necessary columns
DROP VIEW IF EXISTS public.public_profiles;
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  country,
  state_of_origin,
  lga,
  ST_AsText(last_known_coords) as last_known_coords
FROM public.profiles
WHERE onboarding_completed = true;
