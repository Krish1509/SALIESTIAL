# MongoDB Setup Guide for SALIESTIAL

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (Free tier M0 is perfect for development)

## Step 2: Get Your Connection String

1. In MongoDB Atlas, click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" as your driver
4. Copy the connection string (it will look like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 3: Create Database User

1. In MongoDB Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Set user privileges to "Read and write to any database"

## Step 4: Configure Network Access

1. Go to "Network Access" in MongoDB Atlas
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your Vercel server IPs

## Step 5: Update Your Connection String

Replace the placeholders in your connection string:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add database name: `sallestial`

Final connection string format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sallestial?retryWrites=true&w=majority
```

## Step 6: Add to Environment Variables

Add to your `.env.local` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sallestial?retryWrites=true&w=majority
```

## Step 7: For Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `MONGODB_URI` with your connection string
4. Make sure to add it for Production, Preview, and Development environments

## Database Structure

The profile data will be stored in a collection called `profiles` with the following structure:

```javascript
{
  email: "user@example.com",
  name: "User Name",
  image: "https://...",
  phone: "+91 1234567890",
  college: "College Name",
  year: "3rd Year",
  department: "CSE",
  city: "City Name",
  state: "State Name",
  bio: "User bio text",
  createdAt: ISODate("2025-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2025-01-01T00:00:00.000Z")
}
```

## Testing

After setting up, test the connection:
1. Start your dev server: `npm run dev`
2. Sign in with Google
3. Go to Profile page
4. Fill out and save your profile
5. Check MongoDB Atlas to see your data in the `profiles` collection

## Troubleshooting

**Error: "MongoNetworkError"**
- Check your network access settings in MongoDB Atlas
- Make sure your IP is whitelisted

**Error: "Authentication failed"**
- Verify your username and password in the connection string
- Check database user permissions

**Error: "Database not found"**
- The database will be created automatically when you first save data
- Make sure the database name in the connection string is correct

