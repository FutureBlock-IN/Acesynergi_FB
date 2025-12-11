# cPanel Deployment Steps for Acesynergi Platform

## Quick Start Checklist

- [ ] Build application locally
- [ ] Create production `.env` file
- [ ] Upload files to cPanel
- [ ] Set up Node.js application in cPanel
- [ ] Configure database
- [ ] Install dependencies
- [ ] Configure `.htaccess` for React Router
- [ ] Set up SSL certificate
- [ ] Test the application

---

## Step-by-Step Instructions

### Step 1: Prepare Your Application Locally

#### 1.1 Build the Application

Run the deployment preparation script:

```bash
# Make the script executable (if on Linux/Mac)
chmod +x deploy-cpanel.sh

# Run the deployment script
./deploy-cpanel.sh
```

Or manually:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates:
- `dist/public/` - Frontend React build
- `dist/index.js` - Backend server file

#### 1.2 Create Production Environment File

Create `server/.env` with production values:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Database Configuration (update with your cPanel database details)
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
# OR for MySQL:
# DATABASE_URL=mysql://username:password@localhost:3306/database_name

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# PayPal Configuration (if using)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=live

# Session Secret (generate a random string)
SESSION_SECRET=your_secure_random_session_secret_here
```

**Important:** Never commit this file to Git!

---

### Step 2: Upload Files to cPanel

#### Option A: Using cPanel File Manager

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to your domain's root directory:
   - Usually `public_html/` for main domain
   - Or `public_html/subdomain/` for subdomain
4. Upload these files/folders:
   - `dist/` folder (entire folder)
   - `package.json`
   - `server/.env` (your production environment file)

#### Option B: Using FTP/SFTP (Recommended)

Use FileZilla, WinSCP, or similar:

1. Connect to your server:
   - Host: `yourdomain.com` or `ftp.yourdomain.com`
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21 (FTP) or 22 (SFTP)

2. Navigate to `/home/username/public_html/`

3. Upload:
   - `dist/` folder
   - `package.json`
   - `server/.env`

**Note:** Don't upload `node_modules` - we'll install on the server.

---

### Step 3: Set Up Node.js Application in cPanel

1. In cPanel, find **"Node.js Selector"** or **"Setup Node.js App"**
   - If you don't see it, contact your hosting provider to enable Node.js support

2. Click **"Create Application"**

3. Configure the application:
   - **Node.js Version:** Select latest LTS (18.x or 20.x)
   - **Application Root:** `/home/username/public_html`
   - **Application URL:** Choose your domain or subdomain
   - **Application Startup File:** `dist/index.js`
   - **Application Mode:** Production

4. Click **"Create"**

5. **Set Environment Variables:**
   - In the Node.js app settings, click **"Environment Variables"**
   - Add all variables from your `server/.env` file:
     ```
     NODE_ENV=production
     PORT=3000
     DATABASE_URL=your_database_url
     EMAIL_SERVICE=gmail
     EMAIL_USER=your_email
     EMAIL_PASS=your_password
     SESSION_SECRET=your_secret
     PAYPAL_CLIENT_ID=your_id
     PAYPAL_CLIENT_SECRET=your_secret
     PAYPAL_MODE=live
     ```

---

### Step 4: Install Dependencies on Server

#### Option A: Using SSH (Recommended)

1. Connect via SSH:
   ```bash
   ssh username@yourdomain.com
   # Or use the port provided by your host
   ssh -p PORT username@yourdomain.com
   ```

2. Navigate to your application:
   ```bash
   cd ~/public_html
   ```

3. Install dependencies:
   ```bash
   npm install --production
   ```

#### Option B: Using cPanel Terminal

1. Go to **Terminal** in cPanel
2. Run:
   ```bash
   cd ~/public_html
   npm install --production
   ```

---

### Step 5: Set Up Database

#### 5.1 Create Database in cPanel

1. Go to **MySQL Databases** in cPanel
2. Under **"Create New Database"**:
   - Database name: `username_acesynergi` (or your choice)
   - Click **"Create Database"**
3. Under **"Add New User"**:
   - Username: `username_dbuser` (or your choice)
   - Password: Create a strong password
   - Click **"Create User"**
4. Under **"Add User to Database"**:
   - Select the user and database
   - Click **"Add"**
   - Select **"ALL PRIVILEGES"**
   - Click **"Make Changes"**

5. Note down:
   - Database name: `username_acesynergi`
   - Database user: `username_dbuser`
   - Database password: (the one you created)

#### 5.2 Update Database URL

Update your `server/.env` file (or in Node.js Selector environment variables):

**For PostgreSQL:**
```
DATABASE_URL=postgresql://username_dbuser:password@localhost:5432/username_acesynergi
```

**For MySQL:**
```
DATABASE_URL=mysql://username_dbuser:password@localhost:3306/username_acesynergi
```

#### 5.3 Run Database Migrations (if needed)

Via SSH or Terminal:
```bash
cd ~/public_html
npm run db:push
```

---

### Step 6: Configure File Permissions

Via SSH or Terminal:
```bash
cd ~/public_html

# Set directory permissions
chmod 755 ~/public_html
chmod 755 ~/public_html/dist

# Set file permissions
chmod 644 ~/public_html/dist/index.js
chmod 644 ~/public_html/package.json

# Secure environment file
chmod 600 ~/public_html/server/.env
```

---

### Step 7: Create .htaccess for React Router

Create `.htaccess` file in `public_html/`:

1. In File Manager, go to `public_html/`
2. Click **"New File"**
3. Name it `.htaccess`
4. Add this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # Handle React Router - redirect all requests to index.html
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  
  # Force HTTPS (optional but recommended)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
```

---

### Step 8: Start/Restart the Application

1. Go back to **Node.js Selector** in cPanel
2. Find your application
3. Click **"Restart App"** or **"Start App"**

The application should now be running!

---

### Step 9: Set Up SSL Certificate

1. Go to **SSL/TLS Status** in cPanel
2. Find your domain
3. Click **"Run AutoSSL"** or **"Install SSL Certificate"**
4. Select **"Let's Encrypt"** (free SSL)
5. Click **"Install"**

Wait a few minutes for the certificate to be issued.

---

### Step 10: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check if the application loads correctly
3. Test API endpoints: `https://yourdomain.com/api/contact`
4. Check application logs:
   - In Node.js Selector, click **"View Logs"**
   - Or via SSH: `tail -f ~/public_html/logs/app.log` (if logging is configured)

---

## Troubleshooting

### Application Not Starting

1. **Check Node.js version:**
   - Ensure you're using Node.js 18.x or 20.x (LTS)
   - Check in Node.js Selector

2. **Verify startup file:**
   - Ensure `dist/index.js` exists
   - Check file path in Node.js Selector

3. **Check environment variables:**
   - Verify all required variables are set
   - Check for typos in variable names

4. **View error logs:**
   - In Node.js Selector, click **"View Logs"**
   - Look for error messages

### Database Connection Issues

1. **Verify credentials:**
   - Check database name, username, and password
   - Ensure user has proper permissions

2. **Test connection:**
   ```bash
   # Via SSH
   mysql -u username_dbuser -p username_acesynergi
   ```

3. **Check database server:**
   - Ensure MySQL/PostgreSQL is running
   - Check if database exists

### Static Files Not Loading

1. **Check file paths:**
   - Ensure `dist/public/` contains built files
   - Verify paths in code are relative, not absolute

2. **Check file permissions:**
   ```bash
   chmod 644 ~/public_html/dist/public/*
   ```

3. **Check .htaccess:**
   - Ensure `.htaccess` is in `public_html/`
   - Verify rewrite rules are correct

### Port Issues

- cPanel Node.js apps usually run on a specific port assigned by the system
- The port is automatically configured in Node.js Selector
- Your application should use `process.env.PORT` (which cPanel sets automatically)

### 404 Errors on Routes

- Ensure `.htaccess` is configured correctly (Step 7)
- Verify React Router is using hash routing or browser routing correctly
- Check that all routes are handled by the backend

---

## Post-Deployment

### Regular Maintenance

1. **Monitor logs regularly**
2. **Keep dependencies updated:**
   ```bash
   npm update
   npm run build
   # Restart app in cPanel
   ```

3. **Backup regularly:**
   - Database backups (via cPanel)
   - File backups (via cPanel Backup)

4. **Security:**
   - Keep Node.js version updated
   - Update dependencies for security patches
   - Monitor for vulnerabilities: `npm audit`

---

## Quick Reference

### File Structure on Server

```
/home/username/public_html/
├── dist/
│   ├── index.js (backend server)
│   └── public/
│       ├── index.html
│       └── assets/
│           ├── *.js
│           └── *.css
├── server/
│   └── .env (production config)
├── package.json
├── node_modules/
└── .htaccess
```

### Important Commands

```bash
# Build locally
npm run build

# Install dependencies on server
npm install --production

# Run database migrations
npm run db:push

# View logs (if using PM2)
pm2 logs acesynergi

# Restart application
# (Do this via cPanel Node.js Selector)
```

---

## Support

If you encounter issues:

1. Check cPanel error logs
2. Review Node.js application logs in Node.js Selector
3. Verify all environment variables are set correctly
4. Test database connectivity
5. Check file permissions
6. Verify `.htaccess` configuration

---

**Last Updated:** December 2024

