# Vercel Deployment - Quick Reference

## 1. Project Structure Changes

### Created Files:
- `api/index.ts` - Serverless function entry point
- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to exclude from deployment

### Modified Files:
- `server/routes.ts` - Added `registerRoutesForVercel()` function
- `package.json` - Added `build:vercel` script

## 2. Express Server Modification

### `api/index.ts` (Serverless Function)
```typescript
import express from "express";
import { registerRoutesForVercel } from "../server/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware and error handlers...

let routesRegistered = false;

async function setupApp() {
  if (!routesRegistered) {
    await registerRoutesForVercel(app);
    routesRegistered = true;
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const app = await setupApp();
  return new Promise<void>((resolve, reject) => {
    app(req, res, (err?: any) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
```

### `server/routes.ts` (Added Function)
```typescript
// Original function (for local dev) - unchanged
export async function registerRoutes(app: Express): Promise<Server> {
  // ... existing code ...
}

// New function (for Vercel) - no HTTP server creation
export async function registerRoutesForVercel(app: Express): Promise<void> {
  // Same route registration, but no createServer() call
  // ... routes registered here ...
}
```

## 3. Vite Config

### `vite.config.ts` (No Changes Needed)
Already configured correctly:
- Builds to `dist/public`
- Root set to `client/`
- Aliases configured

## 4. Vercel Configuration

### `vercel.json`
```json
{
  "version": 2,
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist/public",
  "installCommand": "npm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/paypal/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "functions": {
    "api/index.ts": {
      "runtime": "nodejs20.x",
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

## 5. Package.json Updates

### Build Scripts
```json
{
  "scripts": {
    "build": "vite build && npm run copy-pricing-file",
    "build:vercel": "vite build && npm run copy-pricing-file",
    "build:server": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist && npm run copy-htaccess && npm run copy-pricing-file",
    // ... other scripts unchanged
  }
}
```

## 6. Environment Variables

### Required Variables (Set in Vercel Dashboard):
```
RESEND_API_KEY=your_resend_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
SESSION_SECRET=your_session_secret
```

### How to Set:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add each variable for Production, Preview, Development
3. Redeploy after adding

**Note**: These are server-side only, NOT exposed to client.

## 7. Deployment Commands

### Via Vercel CLI:
```bash
npm i -g vercel
vercel login
vercel              # Preview deployment
vercel --prod       # Production deployment
```

### Via GitHub:
1. Push code to GitHub
2. Import repo in Vercel
3. Auto-deploys on push

## 8. File Structure

```
project-root/
├── api/
│   └── index.ts              # Serverless function
├── client/                   # React frontend source
├── server/                   # Express backend source
│   ├── routes.ts             # API routes (both functions)
│   ├── email.ts              # Resend integration
│   ├── paypal.ts             # PayPal integration
│   ├── pricing.ts            # Pricing logic
│   └── data/
│       └── course_pricing.xlsx
├── dist/
│   └── public/               # Vite build output (static files)
├── vercel.json               # Vercel config
├── .vercelignore            # Exclude files
└── package.json
```

## 9. Routing Flow

### API Request:
```
Request → Vercel → vercel.json rewrite → api/index.ts → Express route → Response
```

### Frontend Route:
```
Request → Vercel → vercel.json rewrite → dist/public/index.html → React Router
```

### Static Asset:
```
Request → Vercel → dist/public/assets/... → Served directly
```

## 10. Testing Checklist

- [ ] `npm run build:vercel` succeeds locally
- [ ] `dist/public/index.html` exists after build
- [ ] Environment variables set in Vercel
- [ ] Deploy to Vercel
- [ ] Test `/api/health` endpoint
- [ ] Test frontend loads
- [ ] Test API endpoints
- [ ] Test client-side routing
- [ ] Check function logs in Vercel dashboard

## 11. Troubleshooting

### Raw server code showing:
- Check `vercel.json` `outputDirectory` is `dist/public`
- Verify build completed successfully

### API 404 errors:
- Check `api/index.ts` exists and exports default handler
- Verify routes registered in `registerRoutesForVercel()`
- Check `vercel.json` rewrites are correct

### Environment variables not working:
- Set in Vercel dashboard (not `.env` file)
- Redeploy after adding variables
- Check variable names match exactly

### Pricing file not found:
- Ensure `server/data/course_pricing.xlsx` is committed
- File should be in repository (not `.gitignore`)

## 12. Key Points

✅ **No `app.listen()`** in serverless function
✅ **Export default handler** from `api/index.ts`
✅ **Static files** served from `dist/public`
✅ **Client-side routing** via `index.html` fallback
✅ **Environment variables** set in Vercel dashboard
✅ **Local dev** still works with `npm run dev`

