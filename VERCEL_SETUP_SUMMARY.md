# Vercel Deployment Setup - Summary

This document summarizes all the changes made to enable Vercel deployment.

## Files Created

### 1. `api/index.ts`
- **Purpose**: Vercel serverless function entry point
- **Function**: Wraps Express app for Vercel's serverless environment
- **Key Features**:
  - Loads environment variables
  - Sets up Express middleware (JSON parsing, logging, error handling)
  - Registers all API routes via `registerRoutesForVercel()`
  - Exports default handler function for Vercel

### 2. `vercel.json`
- **Purpose**: Vercel deployment configuration
- **Key Settings**:
  - Build command: `npm run build:vercel`
  - Output directory: `dist/public` (Vite build output)
  - Rewrites:
    - `/api/*` → `/api/index` (serverless function)
    - `/paypal/*` → `/api/index` (serverless function)
    - `/*` → `/index.html` (client-side routing fallback)
  - Function configuration: Node.js 20.x runtime, 1GB memory, 30s timeout

### 3. `.vercelignore`
- **Purpose**: Exclude unnecessary files from Vercel deployment
- **Excludes**: Development files, build artifacts, documentation, test files

### 4. `VERCEL_DEPLOYMENT.md`
- **Purpose**: Comprehensive deployment guide
- **Contents**: Step-by-step instructions, troubleshooting, environment variables

## Files Modified

### 1. `server/routes.ts`
- **Change**: Added `registerRoutesForVercel()` function
- **Purpose**: Register routes without creating HTTP server (for serverless)
- **Original**: `registerRoutes()` - still used for local development
- **New**: `registerRoutesForVercel()` - used by Vercel serverless function

### 2. `package.json`
- **Change**: Added `build:vercel` script
- **Purpose**: Build command optimized for Vercel (builds Vite, copies pricing file)
- **Original**: `build` - still used for traditional server deployment
- **New**: `build:vercel` - used by Vercel

## Project Structure Changes

### Before:
```
├── server/
│   └── index.ts (Express server with app.listen())
├── client/
└── dist/ (build output)
```

### After:
```
├── api/
│   └── index.ts (Vercel serverless function)
├── server/
│   └── index.ts (Still works for local dev)
├── client/
├── dist/
│   └── public/ (Vite build - served as static files)
└── vercel.json (Vercel config)
```

## Key Differences: Local vs Vercel

### Local Development (`npm run dev`)
- Express server runs with `app.listen()`
- Vite dev server for hot reload
- All routes handled by Express
- Uses `registerRoutes()` which creates HTTP server

### Vercel Production
- Serverless functions (no `app.listen()`)
- Static files served from `dist/public`
- API routes handled by serverless function
- Uses `registerRoutesForVercel()` (no HTTP server)

## Environment Variables Required

Set these in Vercel Dashboard → Settings → Environment Variables:

1. **RESEND_API_KEY** - Resend email service API key
2. **PAYPAL_CLIENT_ID** - PayPal client ID
3. **PAYPAL_CLIENT_SECRET** - PayPal client secret
4. **SESSION_SECRET** - Session secret (if using sessions)

**Important**: These are server-side only and NOT exposed to the client.

## Build Process

### Vercel Build:
1. `npm install` - Install dependencies
2. `npm run build:vercel` - Build Vite + copy pricing file
3. Vercel detects `api/` folder → creates serverless functions
4. Vercel serves `dist/public` as static files
5. Routes configured via `vercel.json` rewrites

### Local Build:
1. `npm run build` - Build Vite + bundle server + copy files
2. `npm start` - Run Express server

## Routing Flow

### API Request (`/api/contact`):
1. Request hits Vercel
2. `vercel.json` rewrite: `/api/contact` → `/api/index`
3. Vercel invokes `api/index.ts` serverless function
4. Express app handles route → `POST /api/contact`
5. Response returned

### Frontend Route (`/about`):
1. Request hits Vercel
2. No API match, falls through to `vercel.json` rewrite
3. Rewrite: `/*` → `/index.html`
4. Vercel serves `dist/public/index.html`
5. React Router handles client-side routing

### Static Asset (`/assets/logo.png`):
1. Request hits Vercel
2. Vercel serves from `dist/public/assets/logo.png`
3. Cached with long TTL (configured in `vercel.json`)

## Testing the Setup

### Before Deploying:
1. Test local build: `npm run build:vercel`
2. Verify `dist/public/index.html` exists
3. Verify `api/index.ts` exports default function
4. Check `vercel.json` syntax is valid

### After Deploying:
1. Test health endpoint: `https://your-app.vercel.app/api/health`
2. Test frontend: `https://your-app.vercel.app`
3. Test API: `https://your-app.vercel.app/api/pricing/courses`
4. Check Vercel function logs for errors

## Common Issues & Solutions

### Issue: "Raw server code showing"
- **Cause**: Vercel serving wrong files
- **Fix**: Check `vercel.json` `outputDirectory` is `dist/public`

### Issue: "API routes 404"
- **Cause**: Routes not registered or rewrite misconfigured
- **Fix**: Check `api/index.ts` calls `registerRoutesForVercel()`

### Issue: "Environment variables not working"
- **Cause**: Variables not set or wrong environment
- **Fix**: Set in Vercel dashboard, redeploy

### Issue: "Pricing file not found"
- **Cause**: File not in repository or wrong path
- **Fix**: Ensure `server/data/course_pricing.xlsx` is committed

## Next Steps

1. **Set Environment Variables** in Vercel dashboard
2. **Deploy** via Vercel CLI or GitHub integration
3. **Test** all endpoints and frontend routes
4. **Monitor** function logs in Vercel dashboard
5. **Update** domain/CNAME if using custom domain

## Additional Notes

- The original `server/index.ts` still works for local development
- Both deployment methods (traditional server + Vercel) are supported
- Pricing file must be committed to repository (not in `.gitignore`)
- All server-side code runs in serverless functions (no persistent connections)
- Session storage may need adjustment for serverless (consider Redis/external storage)

