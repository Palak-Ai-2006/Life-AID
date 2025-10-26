#!/bin/bash

# LifeAid.tech Deployment Script
echo "🚀 Starting deployment for lifeaid.tech..."

# Set Node.js path
export PATH="$(pwd)/node-v20.18.0-darwin-x64/bin:$PATH"

# Build both projects
echo "📦 Building healthcare-signup..."
cd healthcare-signup
npm run build
cd ..

echo "📦 Building responder-connect..."
cd responder-connect
npm run build
cd ..

echo "✅ Build complete!"

# Option 1: Deploy to Vercel (Recommended)
echo "🌐 Deploying to Vercel..."
echo "Run these commands to deploy:"
echo "1. npm install -g vercel"
echo "2. cd healthcare-signup && vercel --prod"
echo "3. cd ../responder-connect && vercel --prod"
echo "4. Add custom domain 'lifeaid.tech' in Vercel dashboard"

# Option 2: Self-hosted deployment
echo "🏠 For self-hosted deployment:"
echo "1. Install Docker and Docker Compose"
echo "2. Run: docker-compose up -d"
echo "3. Configure your domain DNS to point to your server IP"

echo "🎉 Deployment setup complete!"
