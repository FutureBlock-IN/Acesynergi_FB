# cPanel Deployment Guide for Acesynergi Platform

This guide will help you deploy your full-stack React + Node.js application on cPanel.

## Prerequisites

1. cPanel hosting account with Node.js support
2. SSH access (recommended) or File Manager access
3. Database access (MySQL/PostgreSQL)
4. Domain name configured

---

## Step 1: Prepare Your Application for Production

### 1.1 Build the Application Locally

```bash
# Install dependencies (if not already done)
npm install

# Build the application
npm run build
```

This will:
- Build the React frontend to `dist/public/`
- Build the Node.js backend to `dist/index.js`

### 1.2 Create Production Environment File

Create a `.env` file in the `server/` directory with your production values:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# Database Configuration
DATABASE_URL=your_production_database_url

# Email Configuration (if using)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# PayPal Configuration (if using)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=live

# Session Secret
SESSION_SECRET=your_secure_random_session_secret
```

---

## Step 2: Upload Files to cPanel

### 2.1 Using File Manager

1. Log into your cPanel account
2. Navigate to **File Manager**
3. Go to your domain's root directory (usually `public_html/` or `yourdomain.com/`)
4. Upload the following files/folders:
   - `dist/` folder (contains built application)
   - `package.json`
   - `node_modules/` (or install via SSH)
   - `server/.env` (your production environment file)

### 2.2 Using FTP/SFTP (Recommended)

Use an FTP client like FileZilla or WinSCP:

```
Upload to: /home/username/public_html/
- dist/
- package.json
- server/.env
```

**Note:** You can exclude `node_modules` and install them on the server instead.

---

## Step 3: Set Up Node.js Application in cPanel

### 3.1 Access Node.js Selector

1. In cPanel, find **"Node.js Selector"** or **"Setup Node.js App"**
2. Click **"Create Application"**

### 3.2 Configure Node.js Application

Fill in the following details:

- **Node.js Version:** Select the latest LTS version (e.g., 20.x or 18.x)
- **Application Root:** `/home/username/public_html`
- **Application URL:** Choose your domain or subdomain
- **Application Startup File:** `dist/index.js`
- **Application Mode:** Production

### 3.3 Set Environment Variables

In the Node.js app settings, add your environment variables:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
EMAIL_SERVICE=gmail
EMAIL_USER=your_email
EMAIL_PASS=your_password
SESSION_SECRET=your_secret
```

---

## Step 4: Install Dependencies

### 4.1 Using SSH (Recommended)

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to your application directory
cd ~/public_html

# Install production dependencies
npm install --production

# Or install all dependencies if needed
npm install
```

### 4.2 Using Terminal in cPanel

1. Go to **Terminal** in cPanel
2. Navigate to your directory: `cd ~/public_html`
3. Run: `npm install --production`

---

## Step 5: Set Up Database

### 5.1 Create Database in cPanel

1. Go to **MySQL Databases** in cPanel
2. Create a new database (e.g., `username_acesynergi`)
3. Create a database user
4. Add user to database with ALL PRIVILEGES
5. Note down the database connection details

### 5.2 Update Database URL

Update your `server/.env` file with the database connection string:

```
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
# OR for MySQL:
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

### 5.3 Run Database Migrations (if needed)

```bash
# Via SSH or Terminal
cd ~/public_html
npm run db:push
```

---

## Step 6: Configure File Permissions

Set proper file permissions:

```bash
# Via SSH
chmod 755 ~/public_html
chmod 644 ~/public_html/dist/index.js
chmod 600 ~/public_html/server/.env
```

---

## Step 7: Start/Restart the Application

### 7.1 Using Node.js Selector

1. Go back to **Node.js Selector** in cPanel
2. Find your application
3. Click **"Restart App"** or **"Start App"**

### 7.2 Using SSH

```bash
# If using PM2 (recommended)
npm install -g pm2
pm2 start dist/index.js --name acesynergi
pm2 save
pm2 startup
```

---

## Step 8: Configure .htaccess for React Router

Create/update `.htaccess` in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## Step 9: Set Up SSL Certificate

1. Go to **SSL/TLS Status** in cPanel
2. Install a free SSL certificate (Let's Encrypt)
3. Force HTTPS redirect if needed

---

## Step 10: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check if the application loads correctly
3. Test API endpoints: `https://yourdomain.com/api/...`
4. Check application logs in cPanel or via SSH

---

## Troubleshooting

### Application Not Starting

1. Check Node.js version compatibility
2. Verify `dist/index.js` exists
3. Check environment variables are set correctly
4. Review error logs in cPanel

### Database Connection Issues

1. Verify database credentials in `.env`
2. Check database user has proper permissions
3. Ensure database server is running
4. Test connection via SSH: `mysql -u username -p`

### Static Files Not Loading

1. Verify `dist/public/` contains built files
2. Check file permissions (should be 644)
3. Ensure paths in code are relative, not absolute

### Port Issues

- cPanel Node.js apps usually run on a specific port
- Check the port assigned in Node.js Selector
- Update your application to use the assigned port

---

## Alternative: Using PM2 for Process Management

If your cPanel supports it, use PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start dist/index.js --name acesynergi

# Save PM2 configuration
pm2 save

# Set up PM2 to start on server reboot
pm2 startup
```

---

## File Structure After Deployment

```
/home/username/public_html/
├── dist/
│   ├── index.js (backend)
│   └── public/
│       ├── index.html
│       └── assets/
├── server/
│   └── .env
├── package.json
├── node_modules/
└── .htaccess
```

---

## Important Notes

1. **Security:**
   - Never commit `.env` files to version control
   - Use strong session secrets
   - Keep dependencies updated

2. **Performance:**
   - Enable gzip compression in cPanel
   - Use CDN for static assets if possible
   - Monitor server resources

3. **Backups:**
   - Regularly backup your database
   - Backup application files
   - Keep environment variables secure

4. **Updates:**
   - Test updates in staging first
   - Rebuild application after code changes
   - Restart Node.js app after updates

---

## Support

If you encounter issues:
1. Check cPanel error logs
2. Review Node.js application logs
3. Verify all environment variables
4. Test database connectivity
5. Check file permissions

---

## Quick Deployment Checklist

- [ ] Application built successfully (`npm run build`)
- [ ] Production `.env` file created
- [ ] Files uploaded to cPanel
- [ ] Node.js application created in cPanel
- [ ] Environment variables configured
- [ ] Dependencies installed (`npm install`)
- [ ] Database created and configured
- [ ] Database migrations run (if needed)
- [ ] File permissions set correctly
- [ ] Application started/restarted
- [ ] `.htaccess` configured for React Router
- [ ] SSL certificate installed
- [ ] Application tested and working

---

**Last Updated:** December 2024

