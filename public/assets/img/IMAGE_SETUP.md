# Image Setup Guide

## Folder Structure

Your site now uses **two separate image sets** for each company/project:

```
public/assets/img/
├── preview/                    # Images WITH background (dark)
│   ├── alphaflow-preview.png   # For homepage project cards
│   ├── pulsegate-preview.png
│   ├── swapex-preview.png
│   ├── erevshabbat-preview.png
│   └── novapay-preview.png
│
└── logos/                       # Images WITHOUT background (transparent)
    ├── alphaflow-logo.png      # For project detail pages & deeplink pages
    ├── pulsegate-logo.png
    ├── swapex-logo.png
    ├── erevshabbat-logo.png
    └── novapay-logo.png
```

---

## Where Each Image Is Used

### 1. **Homepage Project Cards** (`public/index.html`)
- **Location:** "Our Projects" section with the 5 project tiles
- **Images used:** `/assets/img/preview/` (with dark background)
- **Status:** Already in place ✅
- **Naming:** `{project}-preview.png`

### 2. **Project Detail Pages** (`public/projects/*.html`)
- **Files:** 
  - `alphaflow.html`
  - `pulsegate.html`
  - `swapex.html`
  - `erevshabbat.html`
  - `novapay.html`
- **Images used:** `/assets/img/logos/` (transparent/no background)
- **Status:** Code updated ✅ (images ready for upload)
- **Naming:** `{project}-logo.png`

### 3. **Deeplink Pages** (`public/links/{project}/index.html`)
- **Files:**
  - `links/alphaflow/index.html`
  - `links/pulsegate/index.html`
  - `links/swapex/index.html`
  - `links/erevshabbat/index.html`
  - `links/novapay/index.html`
- **Images used:** `/assets/img/logos/` (transparent/no background)
- **Status:** Code updated ✅ (images ready for upload)
- **Naming:** `{project}-logo.png`

---

## What You Need To Do

### Step 1: Create Transparent Logos
You need to create **transparent versions** of the company logos (without the dark background) and save them as:
- `alphaflow-logo.png` → transparent AF logo
- `pulsegate-logo.png` → transparent PG logo
- `swapex-logo.png` → transparent SWX logo
- `erevshabbat-logo.png` → transparent E:S logo
- `novapay-logo.png` → transparent Novapay logo

### Step 2: Upload to Correct Folder
Place all transparent logo files in:
```
public/assets/img/logos/
```

### Step 3: Done ✅
The code is already set up to use:
- Preview images (with background) on the homepage
- Logo images (transparent) on project and deeplink pages

---

## File Naming Convention

For consistency, follow this naming:
- **Preview images:** `{projectname}-preview.png`
- **Logo images:** `{projectname}-logo.png`

Example:
```
alphaflow-preview.png   ← Dark background, for homepage
alphaflow-logo.png      ← Transparent, for subpages
```

---

## Summary

| Section | Folder | Filename Pattern | Background |
|---------|--------|------------------|-----------|
| Homepage cards | `preview/` | `{project}-preview.png` | Dark/Black ✅ (already there) |
| Project pages | `logos/` | `{project}-logo.png` | Transparent (add these) |
| Deeplink pages | `logos/` | `{project}-logo.png` | Transparent (add these) |

---

**Next Step:** Create the 5 transparent logo files and place them in `/public/assets/img/logos/`
