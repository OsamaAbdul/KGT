# Kogi Global Tracker

**Connecting the Diaspora, Building the Future.**

The **Kogi Global Tracker** is the official digital intelligence and networking platform for the Kogi State Diaspora. It serves as a unified node network to map, verify, and connect Kogites across every continent, forming the digital foundation for the state's **32-Year Development Plan**.

---

## 🚀 Vision & Objectives

The platform is designed to foster a powerful ecosystem of knowledge transfer, strategic investment, and collaborative governance.

- **Global Mapping**: Visualizing the strength and distribution of our people worldwide.
- **Civic Intelligence**: Leveraging diaspora expertise for state-building initiatives.
- **Verified Network**: Ensuring a trusted environment through secure identity validation (NIN).
- **Economic Integration**: Connecting global talent with local opportunities in Kogi State.

---

## ✨ Key Features

### 🌍 Interactive Global Map
High-performance world visualization with real-time node density. 
- **Privacy-First**: Shows only professional coordinates (Name, Location, Skillset).
- **SVG-Native Tooltips**: Instant location insights on hover.

### 🛡️ Secure Onboarding
- **Identity Verification**: Integrated National Identity Number (NIN) validation.
- **Deep Profile Management**: capturing professional backgrounds, LGA of origin, and current global status.

### 📊 Admin Command Center
A comprehensive dashboard for state administrators to manage the global registry.
- **Advanced Analytics**: Geographical distribution charts and verification health metrics.
- **Master Registry**: Full user management with profile audit capabilities.
- **Intelligence Export**: Generate Master PDF and Excel reports for strategic planning.

### 🌓 Premium Experience
- **Glassmorphism UI**: A cutting-edge, state-of-the-art aesthetic.
- **Theme Logic**: Full support for Dark and Light modes.
- **Responsive Design**: Optimized for mobile nodes and desktop command centers.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI, Framer Motion (Animations), Lucide React (Icons)
- **Backend & Database**: Supabase (PostgreSQL, PostGREST API, Auth)
- **Geographic Data**: PostGIS (Geographical points and spatial queries)
- **Maps**: React-Simple-Maps (World Atlas TopoJSON)
- **Verification**: RSA-4096 / AES-256 Encryption protocols for sensitive metadata

---

## 📦 Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kogi-global-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Security**
   Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Launch the Engine**
   ```bash
   npm run dev
   ```

---

## 🌐 Deployment

The project is optimized for deployment on the **Vercel** platform.
- **SPA Routing**: Configured via `vercel.json` for seamless history API support.
- **Production Build**: 
  ```bash
  npm run build
  ```

---

## ⚖️ Security & Compliance

The Kogi Global Tracker operates under strict data sovereignty protocols:
- **NIN Data**: Stored in encrypted storage buckets, accessible only to authorized administrators.
- **RLS**: Row-Level Security ensures users can only update their own biometric information.
- **Compliance**: Aligned with the Kogi State Digital Hub Act (2024) and Federal Data Protection Regulations (NDPR).

---

© 2026 Kogi State Government. Intelligence Bureau.
