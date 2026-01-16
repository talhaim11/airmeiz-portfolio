# Cloudflare Pages Deployment Guide

Step-by-step instructions for deploying the AIRMEIZ website to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier works perfectly)
- The AIRMEIZ site files ready to deploy

## Option 1: Direct Upload (Fastest)

### Step 1: Prepare Files
1. Ensure all files are in the correct structure
2. No build process needed - it's a static site!

### Step 2: Upload to Cloudflare
1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Workers & Pages"** in the left sidebar
3. Click **"Create application"**
4. Go to the **"Pages"** tab
5. Click **"Upload assets"**
6. Give your project a name: `airmeiz` (or your preferred name)
7. Drag and drop your entire project folder OR click to browse
8. Click **"Deploy site"**

### Step 3: Wait for Deployment
- Cloudflare will upload and deploy your site
- Usually takes 1-2 minutes
- You'll receive a URL like: `airmeiz.pages.dev`

### Step 4: Test Your Site
1. Click the provided URL to view your site
2. Test all pages and navigation
3. Verify responsive design on mobile

## Option 2: Git Integration (Recommended for Teams)

### Step 1: Push to Git Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial deployment of AIRMEIZ website"

# Add remote (GitHub example)
git remote add origin https://github.com/yourusername/airmeiz.git

# Push to main branch
git push -u origin main
```

### Step 2: Connect to Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Workers & Pages"** → **"Create application"**
3. Go to **"Pages"** tab → **"Connect to Git"**
4. Authorize Cloudflare to access your GitHub/GitLab account
5. Select your repository
6. Configure build settings:

   ```
   Production branch: main
   Build command: (leave empty)
   Build output directory: /
   ```

7. Click **"Save and Deploy"**

### Step 3: Automatic Deployments
- Every push to the main branch will trigger a new deployment
- Pull requests get preview deployments automatically

## Custom Domain Setup

### Step 1: Add Custom Domain
1. In your Cloudflare Pages project, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `airmeiz.com`)
4. Click **"Continue"**

### Step 2: Update DNS
If your domain is already on Cloudflare:
- DNS records are automatically configured
- No action needed!

If your domain is elsewhere:
- Update your domain's nameservers to Cloudflare's nameservers
- Or add a CNAME record pointing to your `.pages.dev` domain

### Step 3: SSL Certificate
- Cloudflare automatically provisions SSL certificates
- Usually takes 5-10 minutes
- Your site will be accessible via HTTPS

## Environment Variables (Future Use)

If you add contact form or analytics:

1. Go to **Settings** → **Environment variables**
2. Add your variables:
   ```
   CONTACT_API_KEY=your_key_here
   ANALYTICS_ID=your_id_here
   ```
3. Available in Cloudflare Workers/Functions

## Performance Optimization

### Enable Auto Minify
1. Go to your Cloudflare Pages project
2. Click **"Settings"** → **"Build & deployments"**
3. Enable:
   - ✅ Auto Minify CSS
   - ✅ Auto Minify JavaScript
   - ✅ Auto Minify HTML

### Enable Brotli Compression
Automatically enabled by Cloudflare - no configuration needed!

### Configure Caching
The included `_headers` file already sets optimal cache headers.

## Analytics Setup

### Cloudflare Web Analytics (Free)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click **"Web Analytics"**
3. Click **"Add a site"**
4. Enter your domain
5. Copy the provided JavaScript snippet
6. Add it to your HTML files (before `</body>`):

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
```

## Troubleshooting

### Issue: 404 Errors on Page Refresh

**Solution**: The `_redirects` file should handle this. If issues persist:
1. Check that `_redirects` file is in the `/public/` directory
2. Verify redirect rules syntax
3. Redeploy the site

### Issue: Assets Not Loading

**Solution**: Check file paths
1. Ensure all paths start with `/` (e.g., `/css/main.css`)
2. Verify file names match exactly (case-sensitive)
3. Check browser console for 404 errors

### Issue: Custom Domain Not Working

**Solution**: DNS propagation
1. Wait 24-48 hours for DNS to propagate
2. Clear browser cache
3. Use [DNS Checker](https://dnschecker.org) to verify DNS records

### Issue: Slow Performance

**Solution**: Optimize assets
1. Compress images (use TinyPNG, ImageOptim)
2. Enable auto-minify in Cloudflare settings
3. Check Cloudflare cache settings

## Monitoring & Maintenance

### View Analytics
- Cloudflare Dashboard → Web Analytics
- Monitor traffic, performance, and user behavior

### Check Deployment Status
- Cloudflare Dashboard → Workers & Pages → Your Project
- View deployment history and logs

### Update Content
**Method 1 - Direct Upload**:
1. Go to your project → Deployments
2. Click "Create deployment"
3. Upload updated files

**Method 2 - Git Integration**:
1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```
3. Automatic deployment starts

## Cost Estimation

Cloudflare Pages pricing (as of 2026):

- **Free Tier**:
  - Unlimited bandwidth
  - Unlimited requests
  - 500 builds per month
  - 1 build at a time
  
- **Paid Tier** ($20/month):
  - Everything in Free
  - 5,000 builds per month
  - 5 concurrent builds
  - Advanced build features

**For AIRMEIZ**: The free tier is more than sufficient!

## Support Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Status Page](https://www.cloudflarestatus.com/)

## Post-Deployment Checklist

- [ ] Site accessible at `.pages.dev` URL
- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Mobile menu functions properly
- [ ] All links are working
- [ ] Forms display correctly
- [ ] Images/placeholders display
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Analytics tracking enabled
- [ ] Performance tested (PageSpeed Insights)

## Next Steps

1. ✅ **Deploy the site** using one of the methods above
2. ⏳ **Add real content** (images, videos, text)
3. ⏳ **Implement contact form** backend
4. ⏳ **Set up custom domain**
5. ⏳ **Enable analytics**
6. ⏳ **Monitor and optimize**

---

**Ready to deploy?** Follow Option 1 (Direct Upload) for the fastest deployment!

**Questions?** Check the troubleshooting section or contact Cloudflare support.
