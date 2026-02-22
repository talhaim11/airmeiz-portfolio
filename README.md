# AIRMEIZ - Static Portfolio Website

A modern, elegant portfolio website built with pure HTML, CSS, and JavaScript. Designed for Cloudflare Pages hosting.

## 🌟 Features

- **Pure Static Site**: No frameworks, no build process required
- **Dark Elegant Theme**: Black-based design with cyan accents
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **5 Project Showcases**: Detailed pages for ALPHAFLOW, PULSEGATE, SWAPEX, EREVSHABBAT, and Novapay
- **RTL-Ready**: Structure prepared for right-to-left language support
- **SEO Optimized**: Semantic HTML with proper meta tags
- **Smooth Animations**: CSS-based entrance effects and transitions
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Contact Form UI**: Ready for future API integration
- **Legal Pages**: Privacy Policy and Terms of Service included
- **Deep Links**: App landing pages and "Open in App" smart links for ALPHAFLOW, PULSEGATE, SWAPEX, EREVSHABBAT, Novapay

## 🔗 Deep Links

- **Base URL**: `https://airmeiz.com/links/{app}` (e.g. `/links/alphaflow`)
- **Paths**: `/screens/{name}`, `/content/{type}/{id}`, `/auth` (e.g. `/links/alphaflow/screens/workouts`)
- **Expiry**: Add `?expires=UNIX_TIMESTAMP` to any link; users will see "Link expired" if past that time
- **Custom schemes**: `airmeiz-alphaflow://`, `airmeiz-pulsegate://`, etc.
- **Web fallback**: App-specific landing page with platform detection (iOS/Android), "Open in App" button, and store placeholders

## 📁 Project Structure

```
AirMeiZ site/
├── public/
│   ├── index.html              # Homepage
│   ├── privacy.html            # Privacy Policy
│   ├── terms.html              # Terms of Service
│   └── projects/
│       ├── alphaflow.html      # Sports Application
│       ├── pulsegate.html      # Class Registration Platform
│       ├── swapex.html         # Logistics Application
│       ├── erevshabbat.html    # Medical Research Platform
│       └── novapay.html        # Payment Management System
├── css/
│   └── main.css                # Main stylesheet
├── js/
│   └── main.js                 # JavaScript functionality
├── assets/
│   ├── img/                    # Image placeholders (empty for now)
│   └── video/                  # Video placeholders (empty for now)
│   └── links/                  # Deep link landing pages
│       ├── alphaflow/, pulsegate/, swapex/, erevshabbat/, novapay/
│       ├── css/deeplink.css
│       └── js/deeplink.js
└── README.md                   # This file
```

## 🚀 Deployment to Cloudflare Pages

### Method 1: Git Integration (Recommended)

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AIRMEIZ portfolio site"
   ```

2. **Push to GitHub/GitLab**:
   ```bash
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

3. **Deploy on Cloudflare Pages**:
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to "Pages" → "Create a project"
   - Connect your Git repository
   - Configure build settings:
     - **Build command**: `npm run build` (or leave empty)
     - **Build output directory**: `public`
     - **Root directory**: (leave blank)
   - Click "Save and Deploy"

### Method 2: Direct Upload

1. **Prepare the files**:
   - Ensure all files are in the correct structure
   - No build or compilation needed

2. **Upload to Cloudflare Pages**:
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project" → "Direct Upload"
   - Drag and drop the entire project folder
   - Click "Deploy site"

## 🔧 Configuration for Cloudflare Pages

### Custom Domain Setup

1. Go to your Cloudflare Pages project
2. Click "Custom domains"
3. Add your domain (e.g., `airmeiz.com`)
4. Cloudflare will automatically configure DNS

### _redirects File (Optional)

Only needed for custom redirects. The site uses real HTML files, so no SPA fallback is required. If you add `public/_redirects`, use paths relative to the site root (output is `public/`), e.g.:

```
# Example: redirect old URL to new
/old-page  /projects/alphaflow.html  301
```

### _headers File (Optional)

Create a `public/_headers` file for security headers:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

## 🎨 Customization Guide

### Updating Colors

Edit [css/main.css](css/main.css) and modify CSS variables:

```css
:root {
  --color-primary: #000000;      /* Main background */
  --color-accent: #00d4ff;        /* Accent color */
  --color-text-primary: #ffffff;  /* Primary text */
}
```

### Adding Real Content

#### Images
1. Add images to `assets/img/`
2. Update HTML files to reference images:
   ```html
   <img src="/assets/img/project-name.jpg" alt="Description">
   ```

#### Videos
1. Add videos to `assets/video/`
2. Uncomment video elements in HTML:
   ```html
   <video controls>
     <source src="/assets/video/demo.mp4" type="video/mp4">
   </video>
   ```

#### Team Photos
Replace placeholder divs in [public/index.html](public/index.html):
```html
<div class="team-member-image" style="background-image: url('/assets/img/team/member-name.jpg');"></div>
```

### Implementing Contact Form

The contact form UI is ready. To add functionality:

1. **Option A - Serverless Function**:
   - Use Cloudflare Workers
   - Create a worker to handle form submissions
   - Send emails via SendGrid, Mailgun, or similar service

2. **Option B - Third-Party Service**:
   - Use Formspree, FormSubmit, or similar
   - Update form action in [public/index.html](public/index.html)

3. **Option C - Custom Backend**:
   - Set up your own API endpoint
   - Update form submission logic in [js/main.js](js/main.js)

Example with Cloudflare Workers:

```javascript
// In js/main.js, update initContactForm():
async function submitForm(formData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
}
```

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- High contrast ratios
- Screen reader friendly

## 📱 RTL Support

To enable RTL (Right-to-Left) language support:

1. Add `dir="rtl"` to the `<html>` tag:
   ```html
   <html lang="ar" dir="rtl">
   ```

2. The CSS is already prepared with RTL-specific rules

## 🔮 Future Enhancements

### Planned Features (Not Yet Implemented)

1. **Video Hover Previews**: 
   - Uncomment video elements and related JavaScript
   - Add video files to `assets/video/`

2. **Lead Collection**:
   - Implement contact form backend
   - Add email notification system
   - Integrate with CRM

3. **Analytics**:
   - Add Google Analytics or Cloudflare Web Analytics
   - Uncomment analytics code in `js/main.js`

4. **Image Optimization**:
   - Add lazy loading for images
   - Implement responsive images with srcset

5. **Content Management**:
   - Consider adding a headless CMS (optional)

## 📄 License

Copyright © 2026 AIRMEIZ. All rights reserved.

## 🤝 Support

For questions or support, contact:
- Email: info@airmeiz.com
- Website: [Contact Form](#contact)

## 🛠️ Development

### Local Development

Simply open [public/index.html](public/index.html) in your browser. No build process required!

For a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000/public/`

### Code Style

- **HTML**: Semantic, well-commented
- **CSS**: BEM-inspired naming, CSS custom properties
- **JavaScript**: ES6+, vanilla JavaScript, commented for clarity

### Performance Optimization

- Minify CSS and JS before production (optional)
- Optimize images (use WebP format when possible)
- Enable Cloudflare CDN caching
- Use Cloudflare's auto-minify features

## ✅ Pre-Deployment Checklist

- [ ] Update placeholder text with real content
- [ ] Add actual images and videos
- [ ] Update contact email addresses
- [ ] Test all links
- [ ] Verify responsive design on multiple devices
- [ ] Test mobile navigation
- [ ] Check browser compatibility
- [ ] Review SEO meta tags
- [ ] Test form submissions (if implemented)
- [ ] Verify social media links
- [ ] Update copyright year if needed

## 🎯 Performance Metrics

Target metrics for Cloudflare Pages deployment:
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: > 90
- **Accessibility Score**: 100

---

**Built with ❤️ by AIRMEIZ**
