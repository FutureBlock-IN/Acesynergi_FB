# Blog Creation Error Debugging Guide

## Error: "Server returned an invalid response"

This error occurs when the server returns HTML instead of JSON. Here's how to debug:

### Step 1: Check Server Logs

When you submit the blog form, check your terminal (where `npm run dev` is running) for:

```
[Blog API] ========== REQUEST RECEIVED ==========
[Blog API] Method: POST
[Blog API] Path: /api/blogs
[Blog API] Body keys: [...]
```

**If you DON'T see these logs:**
- The request isn't reaching the server
- The route might not be registered
- **Solution:** Restart the server (`npm run dev`)

**If you DO see these logs:**
- Check for any error messages after them
- The error will show what went wrong

### Step 2: Check Browser Console

Open browser DevTools (F12) → Console tab, and look for:
- Any network errors
- The actual response from the server
- Error messages with details

### Step 3: Verify Server is Running

Make sure your server is running on port 5000:
```bash
npm run dev
```

You should see:
```
✓ Server started successfully on port 5000
[Routes]   POST /api/blogs
```

### Step 4: Test the API Directly

Open browser console and run:
```javascript
fetch('/api/blogs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Blog',
    category: 'General',
    content: 'Test content',
    slug: 'test-blog'
  })
})
.then(r => r.text())
.then(console.log)
.catch(console.error)
```

This will show you the exact response from the server.

### Common Issues & Fixes

1. **Server not restarted after code changes**
   - Fix: Stop server (Ctrl+C) and restart with `npm run dev`

2. **Route not registered**
   - Fix: Check terminal for `[Routes]   POST /api/blogs` message
   - If missing, the route handler might have an error

3. **File path issue**
   - The server will log: `[Blog API] Using blogs file path: ...`
   - Check if this path is correct for your setup

4. **Permission error writing file**
   - Check if the `client/src/data/` directory exists
   - The server will create it automatically, but check for errors

### Next Steps

1. Restart your dev server
2. Try creating a blog again
3. Check the terminal logs for detailed error messages
4. Share the error logs if the issue persists

