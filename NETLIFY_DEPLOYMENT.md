# Netlify Deployment Guide

## Configuration

This project is configured for Netlify deployment with the `@netlify/plugin-nextjs` plugin.

## Netlify Site Settings

In your Netlify dashboard, ensure these settings:

### Build & Deploy Settings

1. **Base directory**: (leave empty)
2. **Build command**: `npm run build`
3. **Publish directory**: ⚠️ **MUST BE EMPTY** - The plugin automatically sets this. If you see it set to `/opt/build/repo` or `.`, clear it!
4. **Node version**: `20.x` or `18.x`

**IMPORTANT:** Go to Site settings → Build & deploy → Continuous Deployment → Build settings

- Click "Edit settings"
- **Clear/Delete the Publish directory field** (it should be completely empty)
- Save changes

### Environment Variables

If you have environment variables, add them in:

- Site settings → Environment variables

## After Deployment

1. **Redeploy**: After adding the `netlify.toml` file and installing the plugin, trigger a new deployment
2. **Check Build Logs**: Verify the build completes successfully
3. **Test Routes**: Try accessing:
   - `/` (home/redirect page)
   - `/login`
   - `/employees`
   - `/employees/1` (dynamic route)

## Troubleshooting

If you still see 404 errors:

1. **Clear Build Cache**: In Netlify → Deploys → Trigger deploy → Clear cache and deploy site
2. **Check Build Logs**: Look for any errors during the build process
3. **Verify Plugin**: Ensure `@netlify/plugin-nextjs` is installed (should be in `devDependencies`)

## Files Added

- `netlify.toml` - Netlify configuration file
- `@netlify/plugin-nextjs` - Next.js runtime plugin for Netlify
