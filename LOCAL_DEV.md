# 🖥️ Local Development Guide

Quick guide for viewing and testing the AIRMEIZ website on your local machine.

## Method 1: Direct File Opening (Simplest)

1. Navigate to the project folder
2. Go to `public/` directory
3. Double-click `index.html`
4. Your default browser will open the site

**Pros:** No setup required  
**Cons:** Some features may not work due to CORS restrictions

---

## Method 2: Local Web Server (Recommended)

### Option A: Python (Pre-installed on Mac/Linux)

```powershell
# Navigate to project root
cd "c:\Users\talha\Downloads\AirMeiZ site"

# Start Python web server
python -m http.server 8000

# Visit in browser:
# http://localhost:8000/public/
```

### Option B: Node.js http-server

```powershell
# Install globally (one time)
npm install -g http-server

# Navigate to project root
cd "c:\Users\talha\Downloads\AirMeiZ site"

# Start server
http-server

# Visit in browser:
# http://localhost:8080/public/
```

### Option C: PHP (If installed)

```powershell
# Navigate to project root
cd "c:\Users\talha\Downloads\AirMeiZ site"

# Start PHP server
php -S localhost:8000

# Visit in browser:
# http://localhost:8000/public/
```

### Option D: VS Code Live Server Extension

1. Open project folder in VS Code
2. Install "Live Server" extension
3. Right-click on `public/index.html`
4. Select "Open with Live Server"
5. Site opens automatically in browser

**Pros:** Auto-reload on file changes  
**Cons:** Requires VS Code

---

## Testing Checklist

Once the site is running locally:

### Desktop Testing
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Smooth scrolling functions
- [ ] All 5 project tiles are visible
- [ ] Hover effects work on project tiles
- [ ] Click project tiles to open detail pages
- [ ] All sections render properly
- [ ] Footer displays correctly

### Mobile Testing
- [ ] Open browser DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test hamburger menu opens/closes
- [ ] Check responsive layout
- [ ] Verify touch interactions
- [ ] Test different screen sizes:
  - iPhone SE (375px)
  - iPhone 12 Pro (390px)
  - iPad (768px)
  - iPad Pro (1024px)

### Navigation Testing
- [ ] Home link returns to top
- [ ] About link scrolls to about section
- [ ] Services link scrolls to services
- [ ] Projects link scrolls to projects
- [ ] Team link scrolls to team section
- [ ] Contact link scrolls to contact form
- [ ] Footer links work
- [ ] Legal page links work

### Project Pages Testing
Visit each project page:
- [ ] ALPHAFLOW (`/public/projects/alphaflow.html`)
- [ ] PULSEGATE (`/public/projects/pulsegate.html`)
- [ ] SWAPEX (`/public/projects/swapex.html`)
- [ ] EREVSHABBAT (`/public/projects/erevshabbat.html`)
- [ ] METASLEEK (`/public/projects/metasleek.html`)

### Legal Pages Testing
- [ ] Privacy Policy (`/public/privacy.html`)
- [ ] Terms of Service (`/public/terms.html`)

---

## Common Issues & Solutions

### Issue: CSS not loading
**Solution:** 
- Check you're accessing via `http://localhost:8000/public/`
- Verify path to CSS file in HTML
- Clear browser cache (Ctrl+Shift+R)

### Issue: JavaScript not working
**Solution:**
- Open browser console (F12)
- Check for JavaScript errors
- Verify `main.js` is loaded
- Ensure you're using a local server (not file://)

### Issue: Links not working
**Solution:**
- Verify you're on a local server
- Check if URLs start with `/`
- Use browser DevTools Network tab to debug

### Issue: Mobile menu not opening
**Solution:**
- Check browser console for errors
- Verify JavaScript is enabled
- Test on actual mobile device

---

## Browser Console

Press **F12** to open DevTools and check:

### Should see:
```
AIRMEIZ website initialized successfully
```

### Should NOT see:
- 404 errors (files not found)
- CORS errors (use local server to fix)
- JavaScript errors (check console for details)

---

## Making Changes

### Edit Content
1. Open HTML files in your text editor
2. Make changes
3. Save file
4. Refresh browser (F5 or Ctrl+R)
5. Changes appear immediately

### Edit Styles
1. Open `css/main.css`
2. Modify CSS rules
3. Save file
4. Hard refresh browser (Ctrl+Shift+R)
5. See updated styles

### Edit JavaScript
1. Open `js/main.js`
2. Make changes
3. Save file
4. Hard refresh browser (Ctrl+Shift+R)
5. Check browser console for errors

---

## Performance Testing

### Check Page Speed
1. Open site in Chrome
2. Press F12 → Lighthouse tab
3. Click "Generate report"
4. Review scores for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Target Scores
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 90+

---

## Ready for Deployment?

Once local testing is complete:

1. ✅ All pages load correctly
2. ✅ Navigation works smoothly
3. ✅ Mobile responsive design verified
4. ✅ No console errors
5. ✅ All links functional

**Next step:** Deploy to Cloudflare Pages!

See [DEPLOYMENT.md](DEPLOYMENT.md) for instructions.

---

## Quick Commands Reference

```powershell
# Python server
python -m http.server 8000

# Visit
http://localhost:8000/public/

# Stop server
Ctrl+C
```

---

**Happy coding! 🚀**
