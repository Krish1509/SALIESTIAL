# SALIESTIAL 2025 - Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Generate NextAuth Secret**
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` in `.env.local`

4. **Configure Google OAuth**
   
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - Enable the Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret to `.env.local`

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sallestial/
├── app/                      # Next.js App Router
│   ├── api/auth/            # NextAuth API routes
│   ├── dashboard/           # Dashboard page (protected)
│   ├── events/              # Events listing page
│   ├── nightfall/           # Cultural events page
│   ├── about/               # About page
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── starfield.tsx        # Animated background
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── profile-modal.tsx    # User profile modal
│   ├── event-card.tsx       # Event card component
│   ├── countdown-timer.tsx  # Countdown timer
│   └── loading.tsx          # Loading component
├── data/                    # Mock data
│   ├── events.ts            # Event data
│   ├── artists.ts           # Artist data
│   └── schedule.ts          # Schedule data
├── lib/                     # Utilities
│   ├── auth.ts              # NextAuth configuration
│   └── utils.ts             # Helper functions
└── types/                   # TypeScript types
    └── index.ts             # Type definitions
```

## Features Implemented

✅ **Landing Page**
- Animated hero section with SALIESTIAL logo
- Starfield animated background
- Countdown timer to event start
- Google OAuth login button
- Smooth scroll animations

✅ **Dashboard** (Protected Route)
- User profile modal with 3D effect
- Quick action cards
- Statistics overview
- Responsive sidebar navigation

✅ **Events Page**
- Event cards with hover animations
- Filter by category (Technical/Gaming)
- Prize pool display
- Registration buttons

✅ **Nightfall Page**
- Artist cards with schedule
- 3-day event schedule
- Day-wise event listings

✅ **About Page**
- SAL Education information
- Organizing clubs showcase
- Mission statement

✅ **Contact Page**
- Contact form with validation
- Contact information cards
- Volunteer signup option

## Design Features

- **Futuristic Theme**: Black background with neon blue (#00d4ff) and red (#ff0066) accents
- **Custom Fonts**: Orbitron (headings), Poppins (body), Space Grotesk (accent)
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first design, works on all screen sizes
- **Glass Morphism**: Modern glassmorphic UI elements
- **Glow Effects**: Neon glow effects on interactive elements

## Customization

### Change Event Date
Edit `components/countdown-timer.tsx`:
```typescript
const eventDate = new Date("2025-03-15T00:00:00").getTime();
```

### Update Events
Edit `data/events.ts` to add/modify events.

### Update Artists
Edit `data/artists.ts` to add/modify artists.

### Update Schedule
Edit `data/schedule.ts` to modify the 3-day schedule.

## Production Build

```bash
npm run build
npm start
```

## Troubleshooting

### NextAuth Issues
- Ensure all environment variables are set correctly
- Check that Google OAuth redirect URI matches exactly
- Verify NEXTAUTH_SECRET is set

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Styling Issues
- Ensure Tailwind CSS is properly configured
- Check that custom fonts are loaded in `layout.tsx`

## Notes

- The app uses mock data (no backend required for demo)
- Images are placeholder - replace with actual event/artist images
- Google OAuth is required for dashboard access
- All routes except dashboard are publicly accessible

