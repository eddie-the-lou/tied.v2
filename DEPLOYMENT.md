# GitHub Pages Deployment Guide

## What Was Fixed

The white screen issue on GitHub Pages was caused by:

1. **Asset path problem** - GitHub Pages serves from `/es139/` subdirectory, not root `/`
2. **Routing problem** - `BrowserRouter` doesn't work on static hosts like GitHub Pages

## Changes Made

### 1. Updated [vite.config.ts](vite.config.ts)
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/es139/',  // ✅ Added this line
})
```
This ensures all assets (JS, CSS) load from the correct subdirectory.

### 2. Changed Router in [src/App.tsx](src/App.tsx)
```typescript
// Before: BrowserRouter (requires server-side routing)
import { BrowserRouter } from 'react-router-dom';

// After: HashRouter (works on static hosts)
import { HashRouter } from 'react-router-dom';
```
HashRouter uses URL fragments (`/#/onboarding`) that work without server configuration.

### 3. Updated [package.json](package.json)
- Added `homepage` field for GitHub Pages URL
- Added `deploy` script for manual deployment
- Added `gh-pages` package for deployment tool

### 4. Created [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
GitHub Actions workflow that automatically:
- Builds the app on push to main
- Deploys to GitHub Pages
- No manual deployment needed!

### 5. Created [public/.nojekyll](public/.nojekyll)
Empty file that tells GitHub Pages not to use Jekyll processing. Important because Vite creates files starting with `_` that Jekyll would ignore.

## How to Deploy

### Automatic Deployment (Recommended)

1. **First-time setup in GitHub:**
   - Go to repository Settings → Pages
   - Under "Build and deployment" → "Source", select **"GitHub Actions"**

2. **Push your code:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Wait 1-2 minutes** for GitHub Actions to build and deploy

4. **Visit your site:** https://armandiorg.github.io/es139/

### Manual Deployment (Alternative)

```bash
npm run deploy
```

This builds the app and pushes the `dist` folder to the `gh-pages` branch.

## URL Structure

### Production URLs (GitHub Pages)
- Homepage: `https://armandiorg.github.io/es139/`
- Routes: `https://armandiorg.github.io/es139/#/onboarding`

The `#` in URLs is intentional - it's how HashRouter works on static hosts.

### Development URLs (Local)
- Homepage: `http://localhost:5173/es139/`
- Routes: `http://localhost:5173/es139/#/onboarding`

## Verifying Deployment

After pushing to main:

1. Go to **Actions** tab in GitHub
2. Click on the latest workflow run
3. Watch the build and deploy steps
4. Once complete (green checkmark), visit the live URL

## Troubleshooting

### White screen after deployment?
- Check browser console for errors
- Verify "GitHub Actions" is selected in Pages settings
- Make sure workflow completed successfully in Actions tab
- Clear browser cache and hard refresh (Cmd+Shift+R)

### Assets not loading (404 errors)?
- Verify `base: '/es139/'` is in vite.config.ts
- Check that the repo name matches the base path

### Routes not working?
- Verify using `HashRouter` not `BrowserRouter` in App.tsx
- URLs should have `#` in them (e.g., `/#/home`)

## Testing Before Deployment

Build and preview locally:
```bash
npm run build
npm run preview
```

Then visit `http://localhost:4173/es139/` to test the production build locally.

## Files Changed for GitHub Pages

- ✅ [vite.config.ts](vite.config.ts) - Added base path
- ✅ [src/App.tsx](src/App.tsx) - Changed to HashRouter
- ✅ [package.json](package.json) - Added deploy scripts and homepage
- ✅ [.github/workflows/deploy.yml](.github/workflows/deploy.yml) - Automated deployment
- ✅ [public/.nojekyll](public/.nojekyll) - Prevent Jekyll processing
- ✅ Fixed TypeScript errors for successful build

Everything is now ready for GitHub Pages! 🚀