# SALIESTIAL 2025 — The Technology Era Starts Here

Official annual techfest website of SAL Institute of Technology.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, Tailwind CSS, Framer Motion
- **Authentication**: Google OAuth via NextAuth.js
- **Responsive Design**: Mobile-first, fully responsive
- **Animations**: Smooth transitions and hover effects
- **Futuristic Theme**: Space-inspired design with neon accents

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Configure Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Update `.env.local` with your credentials

4. Generate NextAuth secret:
```bash
openssl rand -base64 32
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Pages

- **Landing Page** (`/`) - Hero section with animations
- **Dashboard** (`/dashboard`) - User dashboard (requires login)
- **Events** (`/events`) - Browse and filter events
- **Nightfall** (`/nightfall`) - Cultural events and schedule
- **About** (`/about`) - About SAL Education and organizing clubs
- **Contact** (`/contact`) - Contact form and information

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Fonts**: Orbitron, Poppins, Space Grotesk

## 📁 Project Structure

```
sallestial/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes (NextAuth)
│   ├── dashboard/         # Dashboard page
│   ├── events/            # Events page
│   ├── nightfall/         # Nightfall page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── starfield.tsx     # Animated starfield background
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── profile-modal.tsx # User profile modal
│   └── event-card.tsx    # Event card component
├── data/                 # Mock data
│   ├── events.ts         # Event data
│   ├── artists.ts        # Artist data
│   └── schedule.ts       # Schedule data
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── utils.ts          # Utility functions
└── types/                # TypeScript types
    └── index.ts          # Type definitions
```

## 🎯 Events

### Technical Events
- Hackathon - ₹20,000
- Robo Soccer - ₹20,000
- RC Robo Race - ₹20,000
- Autonomous Maze Solver - ₹18,000
- Line Follower - ₹16,000
- Drone Race - ₹20,000

### Gaming Events
- Valorant - ₹26,600
- BGMI - ₹23,600

## 🌙 Nightfall Artists

- Suhani Shah (Day 1)
- Amit Trivedi (Day 2)
- Aditya Gadhvi (Day 3)

## 🎨 Design System

- **Primary Colors**: Red (#ff0066), Blue (#00d4ff)
- **Background**: Dark (#0a0a0a)
- **Fonts**: Orbitron (headings), Poppins (body), Space Grotesk (accent)

## 📝 License

This project is for SALIESTIAL 2025 techfest.
# SALIESTIAL
