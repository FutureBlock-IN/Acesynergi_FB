# Vercel Deployment Guide

This guide explains how to deploy this full-stack application (Vite + React frontend, Express backend) to Vercel.

## Project Structure

The project has been configured for Vercel deployment with the following structure:

```
├── api/
│   └── index.ts          # Vercel serverless function entry point
├── client/               # React frontend source
├── server/               # Express backend source
│   ├── routes.ts         # API routes
│   ├── email.ts          # Resend email integration
│   ├── paypal.ts         # PayPal integration
│   ├── pricing.ts        # Course pricing logic
│   └── data/
│       └── course_pricing.xlsx  # Pricing data file
├── dist/
│   └── public/           # Vite build output (served as static files)
├── vercel.json           # Vercel configuration
└── package.json          # Build scripts
```

## Key Changes for Vercel

### 1. Serverless Functions

The Express server has been converted to Vercel serverless functions:
- **Location**: `api/index.ts`
- **Routes**: All API routes (`/api/*`) and PayPal routes (`/paypal/*`) are handled by the serverless function
- **Static Files**: The Vite build output (`dist/public`) is served as static files

### 2. Build Process

The build process for Vercel:
1. Builds the Vite frontend to `dist/public`
2. Copies the pricing Excel file to ensure it's accessible
3. Vercel automatically detects and deploys the `api/` folder as serverless functions

### 3. Routing Configuration

The `vercel.json` file configures:
- **API Routes**: `/api/*` → `/api/index` (serverless function)
- **PayPal Routes**: `/paypal/*` → `/api/index` (serverless function)
- **Frontend Routes**: All other routes → `/index.html` (for client-side routing)

## Environment Variables

Set these environment variables in your Vercel project settings:

### Required Variables

1. **RESEND_API_KEY** - Your Resend API key for sending emails
2. **PAYPAL_CLIENT_ID** - PayPal client ID
3. **PAYPAL_CLIENT_SECRET** - PayPal client secret
4. **SESSION_SECRET** - Session secret for authentication (if used)

### Optional Variables

- **PRICING_FILE_PATH** - Override the default pricing file path (if needed)
- **NODE_ENV** - Set to `production` (automatically set by Vercel)

### How to Set Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for **Production**, **Preview**, and **Development** environments
4. Redeploy after adding variables

**Important**: These are server-side secrets and will NOT be exposed to the client. Vercel automatically injects them into serverless functions only.

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the configuration and deploy

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your Git repository
4. Vercel will auto-detect the configuration from `vercel.json`

## Build Configuration

The build is configured in `package.json`:

- **Build Command**: `npm run build:vercel`
  - Builds Vite frontend
  - Copies pricing file

- **Output Directory**: `dist/public`
  - Contains the static React app

- **Install Command**: `npm install`
  - Installs all dependencies

## API Endpoints

All API endpoints are available at:

- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/corporate` - Corporate training inquiry
- `GET /api/pricing/:courseName/:country` - Get course pricing
- `GET /api/pricing/:courseName` - Get all pricing for a course
- `GET /api/pricing/country/:country` - Get all pricing for a country
- `GET /api/pricing/courses` - Get all available courses
- `GET /api/pricing/countries` - Get all available countries
- `POST /api/pricing/create-sample` - Create sample Excel file (admin)
- `GET /paypal/setup` - Get PayPal client token
- `POST /paypal/order` - Create PayPal order
- `POST /paypal/order/:orderID/capture` - Capture PayPal order

## Troubleshooting

### Issue: Raw server code showing in browser

**Solution**: This happens when Vercel doesn't detect the static files correctly. Ensure:
- `vercel.json` has `outputDirectory: "dist/public"`
- Build command runs `vite build`
- `dist/public/index.html` exists after build

### Issue: API routes returning 404

**Solution**: Check:
- `api/index.ts` exists and exports a default handler
- Routes are registered in `server/routes.ts`
- `vercel.json` rewrites `/api/*` to `/api/index`

### Issue: Environment variables not working

**Solution**:
- Ensure variables are set in Vercel dashboard
- Variables must be set for the correct environment (Production/Preview/Development)
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Issue: Pricing file not found

**Solution**:
- Ensure `server/data/course_pricing.xlsx` exists in your repository
- The file is included in the deployment (not in `.gitignore`)
- Check `PRICING_FILE_PATH` environment variable if using custom path

### Issue: Resend emails not sending

**Solution**:
- Verify `RESEND_API_KEY` is set correctly in Vercel
- Check Resend dashboard for API key status
- Review serverless function logs in Vercel dashboard
- Ensure sender email is verified in Resend

### Issue: PayPal integration not working

**Solution**:
- Verify `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` are set
- Check PayPal environment (Sandbox vs Production)
- Review serverless function logs for errors
- Ensure PayPal credentials match the environment

## Local Development

For local development, continue using:

```bash
npm run dev
```

This runs the Express server with Vite dev server, which is different from the Vercel deployment setup.

## Production vs Development

- **Development** (`npm run dev`): Express server with Vite dev server
- **Production** (Vercel): Serverless functions + static files

The code automatically detects the environment and adapts accordingly.

## Monitoring

Monitor your deployment:

1. **Vercel Dashboard**: View deployments, logs, and analytics
2. **Function Logs**: Check serverless function execution logs
3. **Analytics**: View traffic and performance metrics

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

