-- Add ghost_mode column to profiles
alter table public.profiles add column if not exists ghost_mode boolean default false;

-- Update public_profiles view to exclude users in ghost mode
create or replace view public.public_profiles as
select 
  id,
  full_name,
  country as origin_country,
  state_of_origin as origin_state,
  lga as origin_lga,
  current_city,
  current_country,
  st_astext(last_known_coords) as last_known_coords
from public.profiles
where onboarding_completed = true and ghost_mode = false;
