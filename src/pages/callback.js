import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Callback() {
    const navigate = useNavigate();
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            // Send the code to the backend (api.py) to exchange for an access token
            axios.post('/api/callback', { code })
                .then(response => {
                    // Handle successful response, e.g., save token in local storage or state
                    console.log('Access Token:', response.data.access_token);
                    console.log('Refresh Token:', response.data.refresh_token);
                    localStorage.setItem('access_token', response.data.access_token); // Save token
                    localStorage.setItem('refresh_token', response.data.refresh_token); // Save refresh token
                    navigate("/home"); // Redirect to home after successful login
                })
                .catch(error => {
                    console.error('Error during authentication:', error);
                    navigate("/"); // fallback
                });
        } else {
            navigate("/"); // Redirect to login if no code is present
        }
    }, [navigate]);

    return <div>Logging in...</div>
}