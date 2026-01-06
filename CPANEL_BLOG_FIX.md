# cPanel Blog API Fix Guide

## Problem
The blog admin page shows "No blog posts yet" even though blogs exist. The API endpoint `/api/blogs` returns a 404 error with HTML instead of JSON.

## Root Cause
On cPanel, the Node.js application needs to be properly configured to handle API routes. The issue can be:

1. **Node.js app not running** - The Node.js application must be started in cPanel
2. **API routes not accessible** - The `.htaccess` should exclude `/api/` routes, but the Node.js server must be running
3. **Blogs file not found** - The `blogs.json` file must be in the correct location

## Solution Steps

### Step 1: Verify Node.js Application is Running

1. Log into cPanel
2. Go to **Node.js Selector** (or **Setup Node.js App**)
3. Find your application
4. Check if it's **Running** (green status)
5. If not running, click **"Start App"** or **"Restart App"**

### Step 2: Verify File Structure

After building and uploading, your file structure should be:

```
public_html/
├── dist/
│   ├── server/
│   │   ├── data/
│   │   │   ├── blogs.json          ← MUST EXIST
│   │   │   └── course_pricing.xlsx
│   │   └── index.js                ← Node.js entry point
│   └── public/
│       ├── index.html
│       ├── .htaccess               ← MUST EXIST
│       └── assets/
├── package.json
└── node_modules/ (or install on server)
```

### Step 3: Verify .htaccess is in Correct Location

The `.htaccess` file must be in `public_html/dist/public/` (or wherever your static files are served from).

**Important**: The `.htaccess` should exclude `/api/` routes:

```apache
# Don't rewrite API routes - let Node.js handle them
RewriteCond %{REQUEST_URI} ^/api/ [OR]
RewriteCond %{REQUEST_URI} ^/paypal/
RewriteRule ^ - [L]
```

### Step 4: Check Node.js Application Configuration

In cPanel Node.js Selector, verify:

- **Application Root**: Should point to where your `dist/` folder is (e.g., `/home/username/public_html`)
- **Application Startup File**: Should be `dist/index.js` or `dist/server/index.js` (depending on your build)
- **Node Version**: Should be 18.x or 20.x (LTS)

### Step 5: Verify Environment Variables

In Node.js Selector, check that environment variables are set:
- `NODE_ENV=production`
- `PORT` (usually set automatically by cPanel)
- Any other required variables (RESEND_API_KEY, etc.)

### Step 6: Check Application Logs

1. In Node.js Selector, click **"View Logs"** or **"Terminal"**
2. Look for errors related to:
   - File not found errors for `blogs.json`
   - Port binding errors
   - Module import errors

### Step 7: Test API Endpoint Directly

Try accessing the API directly in your browser:
- `https://acesynergi.in/api/blogs`

**Expected**: JSON response with blog array
**If you get HTML**: The Node.js app is not handling the route (see Step 1)

### Step 8: Verify blogs.json File Exists

1. Use cPanel File Manager or SSH
2. Navigate to `dist/server/data/`
3. Verify `blogs.json` exists and contains your blogs
4. Check file permissions (should be 644)

### Step 9: Rebuild and Redeploy

If the file structure is wrong:

```bash
# On your local machine
npm run build

# This will:
# 1. Build the React app to dist/public/
# 2. Build the Node.js server to dist/server/
# 3. Copy blogs.json to dist/server/data/
# 4. Copy .htaccess to dist/public/
```

Then upload the entire `dist/` folder to cPanel.

### Step 10: Restart Node.js Application

After uploading files:
1. Go to Node.js Selector
2. Click **"Restart App"**
3. Wait for the app to start
4. Check logs for any errors

## Troubleshooting

### Issue: API returns 404 with HTML

**Solution**: 
- Node.js app is not running → Start it in Node.js Selector
- `.htaccess` is catching API routes → Verify it excludes `/api/`
- Wrong application root → Check Node.js Selector settings

### Issue: "blogs.json not found" in logs

**Solution**:
- File not copied during build → Run `npm run copy-blogs-file` manually
- Wrong path in code → Check server logs for the path it's looking for
- File permissions → Set to 644

### Issue: Node.js app won't start

**Solution**:
- Check Node.js version compatibility
- Check application logs for errors
- Verify `dist/index.js` or `dist/server/index.js` exists
- Check environment variables are set correctly

## Quick Verification Checklist

- [ ] Node.js application is **Running** in cPanel
- [ ] `dist/server/data/blogs.json` exists and has content
- [ ] `.htaccess` is in `dist/public/` and excludes `/api/` routes
- [ ] `dist/server/index.js` (or `dist/index.js`) exists
- [ ] Environment variables are set in Node.js Selector
- [ ] Application logs show no errors
- [ ] `/api/blogs` returns JSON (not HTML) when accessed directly

## Testing

After fixing, test:

1. **Direct API call**: `https://acesynergi.in/api/blogs` → Should return JSON
2. **Admin page**: `https://acesynergi.in/blogs/admin/acesynergi-admin-2024` → Should show blogs
3. **Public blog page**: `https://acesynergi.in/blogs` → Should show blogs

## Additional Notes

- The server looks for `blogs.json` in multiple locations (see `server/routes.ts`)
- It prioritizes `dist/server/data/blogs.json` for production
- If the file doesn't exist, it will create an empty array
- All blog operations (create, update, delete) write to this file

