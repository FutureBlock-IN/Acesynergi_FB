#!/bin/bash

# cPanel Deployment Script for Acesynergi Platform
# This script helps prepare your application for cPanel deployment

echo "🚀 Acesynergi Platform - cPanel Deployment Preparation"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
npm install

echo ""
echo "🔨 Step 2: Building application for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo ""

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ Error: dist directory not found after build."
    exit 1
fi

echo "📋 Files ready for deployment:"
echo "   - dist/ (contains built application)"
echo "   - package.json"
echo "   - server/.env (make sure this is configured for production)"
echo ""

echo "📝 Next steps:"
echo "   1. Upload the following to your cPanel public_html directory:"
echo "      - dist/"
echo "      - package.json"
echo "      - server/.env (production configuration)"
echo ""
echo "   2. In cPanel, create a Node.js application:"
echo "      - Application Root: /home/username/public_html"
echo "      - Startup File: dist/index.js"
echo "      - Node Version: 18.x or 20.x (LTS)"
echo ""
echo "   3. Set environment variables in Node.js Selector"
echo ""
echo "   4. Install dependencies on server:"
echo "      cd ~/public_html && npm install --production"
echo ""
echo "   5. Start/Restart the Node.js application"
echo ""
echo "📖 For detailed instructions, see CPANEL_DEPLOYMENT.md"
echo ""
echo "✨ Deployment preparation complete!"

