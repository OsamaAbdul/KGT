-- Add current location columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_city TEXT,
ADD COLUMN IF NOT EXISTS current_country TEXT;

-- Refresh the public_profiles view to include new columns
DROP VIEW IF EXISTS public.public_profiles;
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  country as origin_country,
  state_of_origin as origin_state,
  lga as origin_lga,
  current_city,
  current_country,
  ST_AsText(last_known_coords) as last_known_coords
FROM public.profiles
WHERE onboarding_completed = true;
