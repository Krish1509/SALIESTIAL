# Google OAuth Setup Guide - Make Sign In Button Work

## Step 1: Create Google OAuth Credentials

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create a New Project** (or select existing)
   - Click on the project dropdown at the top
   - Click "New Project"
   - Name it: "SALIESTIAL 2025" (or any name)
   - Click "Create"

3. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" or "Google Identity"
   - Click on it and click "Enable"

4. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - User Type: External (or Internal if you have Google Workspace)
     - App name: "SALIESTIAL 2025"
     - User support email: Your email
     - Developer contact: Your email
     - Click "Save and Continue"
     - Scopes: Click "Save and Continue" (default is fine)
     - Test users: Add your email, click "Save and Continue"
     - Click "Back to Dashboard"

5. **Create OAuth Client ID**
   - Application type: "Web application"
   - Name: "SALIESTIAL Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://your-vercel-domain.vercel.app` (for production - add after deployment)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (for development)
     - `https://your-vercel-domain.vercel.app/api/auth/callback/google` (for production)
   - Click "Create"
   - **IMPORTANT**: Copy the Client ID and Client Secret (you'll need these!)

## Step 2: Create Environment File

1. **Create `.env.local` file** in the root directory (same folder as `package.json`)

2. **Add these variables:**
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here-generate-with-command-below
   GOOGLE_CLIENT_ID=your-google-client-id-from-step-1
   GOOGLE_CLIENT_SECRET=your-google-client-secret-from-step-1
   ```

3. **Generate NEXTAUTH_SECRET:**
   Run this command in your terminal:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` in `.env.local`

4. **Add your Google credentials:**
   - Replace `your-google-client-id-from-step-1` with your actual Client ID
   - Replace `your-google-client-secret-from-step-1` with your actual Client Secret

## Step 3: Restart Development Server

After creating `.env.local`:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test Sign In

1. Go to http://localhost:3000
2. Click "SIGN IN" button
3. You should be redirected to Google login
4. After signing in, you'll be redirected back to the dashboard

## For Vercel Deployment

When deploying to Vercel:
1. Go to your Vercel project settings
2. Go to "Environment Variables"
3. Add all 4 variables:
   - `NEXTAUTH_URL` = `https://your-domain.vercel.app`
   - `NEXTAUTH_SECRET` = (same secret from `.env.local`)
   - `GOOGLE_CLIENT_ID` = (same from `.env.local`)
   - `GOOGLE_CLIENT_SECRET` = (same from `.env.local`)
4. Update Google OAuth redirect URI in Google Cloud Console to include your Vercel URL

## Troubleshooting

**Error: "MissingSecret"**
- Make sure `NEXTAUTH_SECRET` is set in `.env.local`
- Restart the dev server after adding it

**Error: "Invalid credentials"**
- Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure there are no extra spaces in `.env.local`

**Redirect URI mismatch**
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- No trailing slashes!

**Button doesn't do anything**
- Check browser console for errors
- Make sure the dev server is running
- Verify `.env.local` file exists and has all variables

