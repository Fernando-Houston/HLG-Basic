# Houston Land Guy - Deployment Guide

## Prerequisites
- GitHub account
- Vercel account
- Access to houstonlandguy.com domain DNS settings

## Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial Houston Land Guy website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/houston-land-guy.git
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://website-backend-hlg-production.up.railway.app
   VITE_GA_TRACKING_ID=your-google-analytics-id
   VITE_GTM_ID=your-google-tag-manager-id
   ```
6. Click "Deploy"

## Step 3: Connect Custom Domain

### In Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add `houstonlandguy.com` and `www.houstonlandguy.com`
4. Vercel will provide DNS records

### In Your Domain Provider:
1. Add the following DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel's IP)
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

2. Or if using nameservers:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

## Step 4: SSL Certificate
- Vercel automatically provisions SSL certificates
- Wait 10-30 minutes for DNS propagation

## Step 5: Update Backend CORS

Make sure your Railway backend allows the new domain:
```javascript
// In your backend CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://houstonlandguy.com',
    'https://www.houstonlandguy.com',
    'https://your-project.vercel.app'
  ],
  credentials: true
};
```

## Environment Variables in Vercel

Set these in your Vercel project settings:
- `VITE_API_URL` - Your Railway backend URL
- `VITE_GA_TRACKING_ID` - Google Analytics ID
- `VITE_GTM_ID` - Google Tag Manager ID

## Monitoring

1. Check deployment status in Vercel dashboard
2. Monitor domain propagation: https://dnschecker.org
3. Test all forms and API connections after deployment
4. Verify SSL certificate is active

## Troubleshooting

### If site doesn't load:
- Check DNS propagation (can take up to 48 hours)
- Verify DNS records are correct
- Check Vercel deployment logs

### If API calls fail:
- Verify CORS settings on backend
- Check environment variables in Vercel
- Test API endpoint directly

### If routing doesn't work:
- Ensure vercel.json is present with SPA rewrites
- Clear browser cache
- Check console for errors

## Post-Deployment Checklist

- [ ] Site loads on houstonlandguy.com
- [ ] SSL certificate active (https://)
- [ ] All pages route correctly
- [ ] Forms submit to backend
- [ ] AI Smart Land Finder works
- [ ] Export tools function
- [ ] Mobile responsive
- [ ] Google Analytics tracking
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt