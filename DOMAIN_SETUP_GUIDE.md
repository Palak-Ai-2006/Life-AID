# 🌐 LifeAid.tech Domain Setup Guide

## Overview
This guide will help you connect your domain `lifeaid.tech` to your healthcare applications.

## Your Applications
- **Healthcare Signup**: Patient registration and information collection
- **Responder Connect**: Emergency responder management system

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Perfect for Next.js applications
- Free tier with custom domains
- Automatic HTTPS
- Global CDN
- Easy deployment

**Steps:**
1. **Install Vercel CLI:**
   ```bash
   export PATH="$(pwd)/node-v20.18.0-darwin-x64/bin:$PATH"
   npm install -g vercel
   ```

2. **Deploy Healthcare Signup:**
   ```bash
   cd healthcare-signup
   vercel --prod
   # Follow prompts, choose project name: "lifeaid-healthcare"
   ```

3. **Deploy Responder Connect:**
   ```bash
   cd ../responder-connect
   vercel --prod
   # Follow prompts, choose project name: "lifeaid-responder"
   ```

4. **Add Custom Domain:**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select each project
   - Go to Settings → Domains
   - Add `lifeaid.tech` and `www.lifeaid.tech`
   - Configure DNS as instructed

**Domain Structure:**
- `lifeaid.tech` → Healthcare Signup (main site)
- `lifeaid.tech/responder` → Responder Connect

### Option 2: Netlify

**Steps:**
1. **Install Netlify CLI:**
   ```bash
   export PATH="$(pwd)/node-v20.18.0-darwin-x64/bin:$PATH"
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   # Healthcare Signup
   cd healthcare-signup
   npm run build
   netlify deploy --prod --dir=.next
   
   # Responder Connect
   cd ../responder-connect
   npm run build
   netlify deploy --prod --dir=.next
   ```

3. **Add Custom Domain:**
   - Go to [netlify.com](https://netlify.com)
   - Add custom domain in site settings

### Option 3: Self-Hosted (Advanced)

**Requirements:**
- VPS or dedicated server
- Docker and Docker Compose installed
- Domain DNS access

**Steps:**
1. **Deploy to Server:**
   ```bash
   # Copy files to your server
   scp -r . user@your-server:/var/www/lifeaid
   
   # On server, run:
   cd /var/www/lifeaid
   docker-compose up -d
   ```

2. **Configure DNS:**
   - Point `lifeaid.tech` to your server IP
   - Add A record: `@` → `YOUR_SERVER_IP`
   - Add CNAME: `www` → `lifeaid.tech`

3. **SSL Certificate:**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Get SSL certificate
   sudo certbot --nginx -d lifeaid.tech -d www.lifeaid.tech
   ```

## 🔧 DNS Configuration

### For Vercel/Netlify:
1. **A Record:** `@` → `76.76.19.61` (Vercel IP)
2. **CNAME:** `www` → `cname.vercel-dns.com`

### For Self-Hosted:
1. **A Record:** `@` → `YOUR_SERVER_IP`
2. **CNAME:** `www` → `lifeaid.tech`

## 📁 File Structure After Deployment

```
lifeaid.tech/
├── / (Healthcare Signup - Main Landing)
├── /responder (Responder Connect App)
├── /api/healthcare (Healthcare API)
└── /api/responder (Responder API)
```

## 🛠️ Environment Variables

Create `.env.local` files for each project:

**healthcare-signup/.env.local:**
```env
NEXT_PUBLIC_SITE_URL=https://lifeaid.tech
NEXT_PUBLIC_API_URL=https://lifeaid.tech/api/healthcare
```

**responder-connect/.env.local:**
```env
NEXT_PUBLIC_SITE_URL=https://lifeaid.tech/responder
NEXT_PUBLIC_API_URL=https://lifeaid.tech/api/responder
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## 🚀 Quick Start Commands

```bash
# Run deployment script
./deploy.sh

# Or manually:
export PATH="$(pwd)/node-v20.18.0-darwin-x64/bin:$PATH"

# Build both projects
cd healthcare-signup && npm run build && cd ..
cd responder-connect && npm run build && cd ..

# Deploy to Vercel
npm install -g vercel
cd healthcare-signup && vercel --prod && cd ..
cd responder-connect && vercel --prod
```

## 🔍 Testing Your Domain

After deployment, test these URLs:
- `https://lifeaid.tech` - Healthcare Signup
- `https://lifeaid.tech/responder` - Responder Connect
- `https://www.lifeaid.tech` - Redirects to main site

## 📞 Support

If you need help with any step, the deployment script will guide you through the process. All configurations are already set up for your domain!

## 🎯 Next Steps

1. Choose your deployment option (Vercel recommended)
2. Run the deployment commands
3. Configure your domain DNS
4. Test your live applications
5. Set up SSL certificates (automatic with Vercel/Netlify)

Your LifeAid.tech domain will be live and ready! 🎉
