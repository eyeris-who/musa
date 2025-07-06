# Vercel Deployment Guide

## Prerequisites

1. **Spotify App Configuration**: Make sure your Spotify app has the correct redirect URI:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Select your app
   - Go to "Edit Settings"
   - Add `https://musa-cally.vercel.app/callback` to the Redirect URIs list
   - Save the changes

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm deployment settings

## Troubleshooting Login Issues

### Common Issues:

1. **"Invalid redirect URI" error**:
   - Ensure `https://musa-cally.vercel.app/callback` is added to your Spotify app's redirect URIs
   - Check that the URI matches exactly (no trailing slashes)

2. **CORS errors**:
   - The Flask API is configured to allow requests from `https://musa-cally.vercel.app`
   - Check browser console for CORS-related errors

3. **"Failed to get token" error**:
   - Verify your Spotify Client ID and Secret are correct in `api/api.py`
   - Check that the redirect URI in the code matches your Spotify app settings

4. **Network errors**:
   - Ensure both frontend and backend are deployed successfully
   - Check Vercel function logs for API errors

### Debugging Steps:

1. **Check Vercel Function Logs**:
   - Go to your Vercel dashboard
   - Select your project
   - Go to "Functions" tab
   - Check for any errors in the `/api/callback` function

2. **Test API Endpoints**:
   - Try accessing `https://musa-cally.vercel.app/api/route` directly
   - Should return `{"variable": 0.9, "variable2": 0.7}`

3. **Check Browser Console**:
   - Open developer tools
   - Look for any JavaScript errors during login
   - Check Network tab for failed requests

## Local Development

For local development, you can still use the batch script:

```bash
start-dev.bat
```

This will start both the Flask API (port 5000) and React app (port 3000) locally.

## Environment Variables

If you need to use environment variables for sensitive data:

1. **Vercel Dashboard**:
   - Go to your project settings
   - Add environment variables like `SPOTIFY_CLIENT_SECRET`

2. **Update API Code**:
   ```python
   import os
   SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET', 'your-default-secret')
   ```

## File Structure for Vercel

```
spotify-api-test/
├── api/
│   ├── api.py
│   └── requirements.txt
├── src/
│   └── ... (React files)
├── package.json
├── vercel.json
└── requirements.txt
``` 