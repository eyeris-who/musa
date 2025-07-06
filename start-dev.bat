@echo off
echo Starting Spotify API Test Development Environment...

echo.
echo Starting Flask API server...
cd api
start "Flask API" cmd /k "python -m pip install -r requirements.txt && python api.py"

echo.
echo Starting React development server...
cd ..
start "React App" cmd /k "npm start"

echo.
echo Development servers are starting...
echo Flask API will be available at: http://localhost:5000
echo React app will be available at: http://localhost:3000
echo.
echo Please wait for both servers to fully start before testing the login functionality.
pause 