# Image Setup Guide

## Folder Structure

Your site now uses **two separate image sets** for each company/project:

```
public/assets/img/
├── preview/                    # Images WITH background (dark)
│   ├── alphaflow-preview.png   # For homepage project cards
│   ├── pulsegate-preview.png
│   ├── swappex-preview.png or swapex-preview.png
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

### 1. **Homepage Project Cards** (`react-app/src/components/airmeizcore/RobotScene.tsx`)
- **Location:** React homepage nodes in the hero section
- **Images used:** `/assets/img/logos/` (transparent/no background)
- **Status:** Active app uses logos only ✅
- **Naming:** `{project}-logo.png`

### 2. **Project Detail Pages** (`react-app/src/pages/*`)
- **Files:** 
  - `AlphaflowLovablePage.tsx`
  - `ProjectPage.tsx` (pulsegate + novapay)
  - `SwappexPage.tsx`
  - `ErevShabbatPage.tsx`
- **Images used:** `/assets/img/logos/` (transparent/no background)
- **Status:** Code updated ✅ (images ready for upload)
- **Naming:** `{project}-logo.png`

### 3. **Legacy Deeplink Pages**
- Previous deeplink HTML pages were moved to `legacy-static/public-legacy/links/`
- They are no longer part of the active website runtime

---

## What You Need To Do

### Step 1: Create Transparent Logos
You need to create **transparent versions** of the company logos (without the dark background) and save them as:
- `alphaflow-logo.png` → transparent AF logo
- `pulsegate-logo.png` → transparent PG logo
- `swapex-logo.png` → transparent SWAPPEX logo
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
