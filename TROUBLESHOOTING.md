# Login Functionality Troubleshooting Guide

## Issues Fixed

1. **Redirect URI Mismatch**: Updated from production URL to local development URL
2. **CORS Issues**: Added CORS support to Flask API
3. **Route Configuration**: Fixed callback route to work with local development

## Setup Instructions

### 1. Install Dependencies

For the Flask API:
```bash
cd api
pip install -r requirements.txt
```

For the React app:
```bash
npm install
```

### 2. Start Development Servers

**Option A: Use the batch script (Windows)**
```bash
start-dev.bat
```

**Option B: Manual start**

Terminal 1 (Flask API):
```bash
cd api
python api.py
```

Terminal 2 (React App):
```bash
npm start
```

### 3. Test the Login Flow

1. Open http://localhost:3000 in your browser
2. Click "Login With Spotify"
3. Authorize the application in Spotify
4. You should be redirected back to the app and logged in

## Common Issues and Solutions

### Issue: "Failed to get token" error
- **Cause**: Redirect URI mismatch between Spotify app settings and code
- **Solution**: Make sure your Spotify app's redirect URI includes `http://localhost:3000/callback`

### Issue: CORS errors in browser console
- **Cause**: Flask API not configured for CORS
- **Solution**: Ensure flask-cors is installed and configured

### Issue: "Network error" or connection refused
- **Cause**: Flask API not running
- **Solution**: Start the Flask API server on port 5000

### Issue: React app not loading
- **Cause**: React development server not running
- **Solution**: Start the React app with `npm start`

## Spotify App Configuration

Make sure your Spotify app (in Spotify Developer Dashboard) has these redirect URIs:
- `http://localhost:3000/callback` (for development)
- `https://musa-cally.vercel.app/api/callback` (for production)

## Debug Steps

1. Check browser console for errors
2. Check Flask API console for errors
3. Verify both servers are running on correct ports
4. Test API endpoints directly with tools like Postman
5. Check network tab in browser dev tools for failed requests

## Environment Variables

The app uses these Spotify credentials (already configured):
- Client ID: `aae53e8417b047308811890aab5b2cd4`
- Client Secret: `4329a41d79a846e58f57ebdfdd3d826c`

## Ports Used

- React App: http://localhost:3000
- Flask API: http://localhost:5000 