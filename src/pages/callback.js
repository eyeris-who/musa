import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Callback() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        const error = new URLSearchParams(window.location.search).get("error");
        
        console.log('Callback received:', { code: !!code, error });
        
        if (error) {
            setError(`Authentication failed: ${error}`);
            setLoading(false);
            setTimeout(() => navigate("/"), 3000);
            return;
        }

        if (!code) {
            setError("No authorization code received");
            setLoading(false);
            setTimeout(() => navigate("/"), 3000);
            return;
        }

        // Add timeout to the request
        const timeout = setTimeout(() => {
            setError("Request timed out. Please try again.");
            setLoading(false);
            setTimeout(() => navigate("/"), 3000);
        }, 15000); // 15 second timeout

        console.log('Sending code to API...');
        axios.post('/api/callback', { code }, { timeout: 15000 })
            .then(response => {
                clearTimeout(timeout);
                console.log('Authentication successful:', response.data);
                
                // Save tokens with expiration
                const expiresIn = response.data.expires_in || 3600;
                const expiresAt = Date.now() + (expiresIn * 1000);
                
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('token_expires_at', expiresAt.toString());
                
                console.log('Tokens saved, navigating to home...');
                navigate("/home");
            })
            .catch(error => {
                clearTimeout(timeout);
                console.error('Error during authentication:', error);
                
                let errorMessage = "Authentication failed";
                if (error.response) {
                    console.error('Response error:', error.response.data);
                    errorMessage = error.response.data.error || `Server error: ${error.response.status}`;
                } else if (error.code === 'ECONNABORTED') {
                    errorMessage = "Request timed out. Please try again.";
                } else if (error.message) {
                    errorMessage = `Network error: ${error.message}`;
                }
                
                setError(errorMessage);
                setLoading(false);
                setTimeout(() => navigate("/"), 5000);
            });
    }, [navigate]);

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="text-center">
                    <h3 className="text-danger mb-3">Login Error</h3>
                    <p className="text-muted">{error}</p>
                    <p className="text-muted">Redirecting to login page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h3>Logging you in...</h3>
                <p className="text-muted">Please wait while we authenticate with Spotify</p>
            </div>
        </div>
    );
}