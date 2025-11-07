#!/bin/bash

# SALIESTIAL - Environment Setup Script
echo "🚀 Setting up SALIESTIAL environment variables..."

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Generate a secure secret
SECRET=$(openssl rand -base64 32)

# Create .env.local file
cat > .env.local << EOF
# SALIESTIAL 2025 - Environment Variables
# Generated on $(date)

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$SECRET

# Google OAuth Credentials
# Get these from: https://console.cloud.google.com/
# Follow instructions in GOOGLE_OAUTH_SETUP.md
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
EOF

echo "✅ Created .env.local file with generated secret!"
echo ""
echo "📝 Next steps:"
echo "1. Go to https://console.cloud.google.com/"
echo "2. Create OAuth credentials (see GOOGLE_OAUTH_SETUP.md for details)"
echo "3. Replace 'your-google-client-id-here' with your Client ID"
echo "4. Replace 'your-google-client-secret-here' with your Client Secret"
echo "5. Restart your dev server: npm run dev"
echo ""
echo "📖 Full instructions: See GOOGLE_OAUTH_SETUP.md"

