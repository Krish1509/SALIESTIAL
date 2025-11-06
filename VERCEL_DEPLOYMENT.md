# Vercel Deployment Guide

## ✅ Deployment Status

Your SALIESTIAL 2025 website has been successfully deployed to Vercel!

**Production URL:** https://sallestial-6d5sgbea9-krish1509s-projects.vercel.app

## 🔧 Required Environment Variables

To enable Google OAuth login, you need to add the following environment variables in your Vercel project settings:

1. Go to your Vercel Dashboard: https://vercel.com/krish1509s-projects/sallestial
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXTAUTH_URL=https://sallestial-6d5sgbea9-krish1509s-projects.vercel.app
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Steps to Get Google OAuth Credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Choose **Web application**
6. Add authorized redirect URI:
   ```
   https://sallestial-6d5sgbea9-krish1509s-projects.vercel.app/api/auth/callback/google
   ```
7. Copy the **Client ID** and **Client Secret** to Vercel environment variables

### Generate NEXTAUTH_SECRET:

Run this command locally:
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in Vercel.

## 🔄 After Adding Environment Variables

1. Go to **Deployments** tab in Vercel
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy** to apply the new environment variables

## 📝 Custom Domain (Optional)

To add a custom domain:

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Update `NEXTAUTH_URL` environment variable to match your custom domain

## 🚀 Automatic Deployments

Your project is connected to GitHub. Every push to the `main` branch will automatically trigger a new deployment.

## 📊 Monitoring

- View deployment logs: `npx vercel logs`
- Check deployment status: `npx vercel ls`
- Inspect a deployment: `npx vercel inspect <deployment-url>`

## 🐛 Troubleshooting

If you encounter issues:

1. Check build logs in Vercel Dashboard
2. Verify all environment variables are set correctly
3. Ensure Google OAuth redirect URI matches your Vercel URL
4. Check that `NEXTAUTH_SECRET` is set and valid

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [NextAuth.js Documentation](https://next-auth.js.org/)


