# Netlify Deployment - Basic Configuration

## Current Setup

This project uses a basic Netlify configuration without plugins.

## Netlify Settings

In your Netlify dashboard:

1. **Build command**: `npm run build`
2. **Publish directory**: Leave EMPTY (or delete the field entirely)
3. **Node version**: 20.x

## Important Notes

- The plugin has been removed for simplicity
- Make sure the "Publish directory" field in Netlify UI is completely empty
- API routes may need additional configuration depending on your setup

## After Deployment

1. Clear build cache and redeploy
2. Verify all routes work correctly
