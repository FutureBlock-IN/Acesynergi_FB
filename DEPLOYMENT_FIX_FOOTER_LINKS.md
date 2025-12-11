# Fix for Footer Links Not Working on cPanel

## Problem
Footer links like `/terms-and-conditions`, `/privacy-policy`, `/refund-policy`, and `/disclaimer` were not working after deploying to cPanel, while other links like `/corporate` worked fine.

## Solution Applied

### 1. Updated Footer Component
Changed footer links from regular `<a>` tags to React Router's `Link` component to ensure proper client-side routing:

**File:** `client/src/components/Footer.tsx`
- Imported `Link` from `wouter`
- Changed all internal links to use `<Link>` instead of `<a>`
- External links (like social media) still use `<a>` tags

### 2. Improved Server Route Handling
Updated the `serveStatic` function to better handle React Router routes:

**File:** `server/vite.ts`
- Improved the catch-all route to properly serve `index.html` for all non-API routes
- Ensures API routes return 404 if not found
- All other routes serve `index.html` so React Router can handle them

### 3. Created .htaccess File
Created a `.htaccess` file for Apache (if Apache is in front of your Node.js app):

**File:** `.htaccess` (root directory)
- Handles React Router routes
- Excludes API routes from rewriting
- Excludes static assets from rewriting
- Includes compression and caching rules

## Deployment Steps

### Step 1: Rebuild the Application

```bash
npm run build
```

### Step 2: Copy .htaccess to dist/public

After building, copy the `.htaccess` file to the `dist/public/` directory:

```bash
# On Linux/Mac
cp .htaccess dist/public/.htaccess

# On Windows
copy .htaccess dist\public\.htaccess
```

Or manually copy it via File Manager in cPanel.

### Step 3: Upload to cPanel

Upload the following to your `public_html/` directory:
- `dist/` folder (entire folder)
- `package.json`
- `server/.env` (production configuration)

**Important:** Make sure `dist/public/.htaccess` is included in the upload.

### Step 4: Restart Node.js Application

1. Go to **Node.js Selector** in cPanel
2. Find your application
3. Click **"Restart App"**

### Step 5: Verify

Test all footer links:
- `/terms-and-conditions`
- `/privacy-policy`
- `/refund-policy`
- `/disclaimer`
- `/rescheduling-policy`
- `/about-us`
- `/blog`

All should now work correctly!

## How It Works

1. **Client-Side Routing**: React Router (wouter) handles all route changes in the browser
2. **Server Fallback**: When a user directly visits a route like `/terms-and-conditions`, the server serves `index.html`
3. **React Router Takes Over**: Once `index.html` loads, React Router reads the URL and renders the correct component
4. **.htaccess Backup**: If Apache is in front of your Node.js app, `.htaccess` ensures routes are rewritten correctly

## Troubleshooting

### If links still don't work:

1. **Check server logs** in Node.js Selector
2. **Verify .htaccess is in dist/public/** directory
3. **Check that routes are defined** in `client/src/App.tsx`
4. **Clear browser cache** and try again
5. **Test with direct URL** (e.g., `https://acesynergi.in/terms-and-conditions`)

### If you see 404 errors:

1. Ensure `dist/public/index.html` exists
2. Check that `serveStatic` function is being called in production
3. Verify Node.js app is running and serving files correctly

## Files Modified

1. `client/src/components/Footer.tsx` - Updated to use React Router Links
2. `server/vite.ts` - Improved route handling
3. `.htaccess` - Created for Apache routing (if needed)

---

**Last Updated:** December 2024

