

# Kogi Global Tracker — Full Implementation Plan

## Overview
A premium civic-tech web application that tracks and visualizes the global Kogi diaspora on an interactive map, with user registration, identity verification, and an admin command center.

---

## Phase 1: Backend Setup (Lovable Cloud + Supabase)

- **Enable Lovable Cloud** for the project with Supabase backend
- **Enable PostGIS extension** for geographic data support
- **Create profiles table** with all required fields: full_name, email, NIN, NIN slip URL, country, state_of_origin, LGA, occupation, DOB, is_verified, last_known_coords (geography point), ip_address
- **Create user_roles table** (separate from profiles, as required for security) with an `app_role` enum (`user`, `admin`)
- **Auto-create profile** on signup via database trigger
- **RLS policies**:
  - Public can read `last_known_coords` and `country` from profiles
  - Only admins (checked via `has_role()` security definer function) can read `nin` and `full_name`
  - Users can read/update their own full profile
- **Storage bucket** for NIN slip uploads with appropriate RLS

---

## Phase 2: Hero Section & Interactive Map

- **Sticky glassmorphism header** with "KOGI GLOBAL TRACKER" branding and a "Join the Map" call-to-action button
- **Two-column hero layout**:
  - **Left (40%)**: Shadcn Tabs for "Login" and "Create Account" forms (Supabase Auth)
  - **Right (60%)**: Full-height interactive world map using `react-simple-maps`
- **Map features**:
  - Fetch all `last_known_coords` from profiles
  - Render pulsing Kogi Green (#006837) bubbles at each location
  - Hover tooltip showing country flag (via `flag-icons`) and "Kogite in [Country]"
- **Dark-mode map** aesthetic with smooth `framer-motion` fade-in animations
- **"Authenticating Neural Access…" loader** — a clean animated loading screen shown while the map data loads

---

## Phase 3: Multi-Step Registration & Location Capture

A 4-step onboarding wizard:

1. **Step 1 — Credentials**: Email and password sign-up (Supabase Auth)
2. **Step 2 — Profile**: Full Name, Date of Birth, Occupation
3. **Step 3 — Origin**: Country dropdown, State (validated to "Kogi" — shows a warning if another state is selected), LGA dropdown
4. **Step 4 — Identity**: NIN text input + NIN Slip file upload (saved to Supabase Storage)

**On Submit**:
- Capture precise coordinates via `navigator.geolocation`
- Capture IP address via a public API (ipapi.co)
- Save all data to the profiles table
- Show a **confetti celebration** (canvas-confetti) and redirect to a Profile Overview dashboard

---

## Phase 4: Admin Command Center

- **Protected `/admin` route** (only accessible to users with the `admin` role)
- **Collapsible sidebar** with links: User Management, Map Analytics, Settings
- **User Management page**:
  - Shadcn DataTable with pagination, search by name/LGA, and role badges
  - Row actions: "Verify" and "Delete" buttons
  - Filter for users "Not from Kogi" for easy cleanup
- **Export functionality**: Export user data to PDF (jsPDF) and Excel (xlsx)
- **Admin header**: Sticky bar with search, admin profile avatar, and Sign Out button

---

## Phase 5: Polish, Content & Mobile Optimization

- **About Section**: 3-column layout explaining the "Kogi 32-Year Development Plan" and why global tracking matters
- **Privacy Policy & Terms of Service**: Professional text pages explaining public location data usage
- **Footer**: 4-column layout with Kogi State Government branding, social links, and "Secured by Encryption" badge
- **Mobile responsiveness**: Map collapses below the login form on small screens; all layouts adapt gracefully
- **Lucide-React icons** used consistently throughout the app for a premium feel

