# Deployment Guide for Redgold Blood Bank Management System

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Create a Vercel account at https://vercel.com
3. Make sure your MongoDB Atlas database is accessible

## Environment Variables for Production
You'll need to set these environment variables in Vercel:

### Server Environment Variables:
- `MONGO_URI`: `dummy`
- `JWT_SECRET`: `summydummy`
- `NODE_ENV`: `production`

## Deployment Steps

### Option 1: Deploy via Vercel CLI
1. Open terminal in the project root directory
2. Run: `vercel login` (login to your Vercel account)
3. Run: `vercel` (follow the prompts)
4. When asked about settings, use these:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name: `redgold-blood-bank`
   - In which directory is your code located? `./`
5. Add environment variables:
   ```bash
   vercel env add MONGO_URI
   # Paste: mongodb+srv://dipanshu:hi%402004@cluster0.jupodds.mongodb.net/redgold?retryWrites=true&w=majority
   
   vercel env add JWT_SECRET
   # Paste: summydummy
   
   vercel env add NODE_ENV
   # Paste: production
   ```
6. Redeploy: `vercel --prod`

### Option 2: Deploy via GitHub (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com/dashboard
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`
6. Add environment variables in Vercel dashboard:
   - `MONGO_URI`: `mongodb+srv://dipanshu:hi%402004@cluster0.jupodds.mongodb.net/redgold?retryWrites=true&w=majority`
   - `JWT_SECRET`: `summydummy`
   - `NODE_ENV`: `production`
7. Deploy!

## Project Structure for Deployment
```
redgold/
├── client/          # React frontend
├── server/          # Node.js backend
├── vercel.json      # Vercel configuration
├── package.json     # Root package.json
└── DEPLOYMENT.md    # This file
```

## Important Notes
1. The client will be served as static files
2. The server will run as serverless functions
3. API routes will be available at `/api/*`
4. Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges

## Troubleshooting
- If deployment fails, check the build logs in Vercel dashboard
- Ensure all environment variables are set correctly
- Verify MongoDB connection string is URL-encoded properly
- Check that all API calls in the client use the config file

## Post-Deployment
After successful deployment:
1. Test all functionality (login, register, booking, donations)
2. Verify database connections are working
3. Check that all API endpoints respond correctly
