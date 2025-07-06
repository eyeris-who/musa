import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "https://musa-cally.vercel.app/api/callback";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=aae53e8417b047308811890aab5b2cd4&response_type=code&"+
  "redirect_uri="+ BASE_URL +
  "&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private&show_dialog=true";

export default function Login() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get("code");
  //   if (code) {
  //     // Save token or code here if needed
  //     navigate("/"); // Redirect to home
  //   }
  // }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>Login With Spotify</a>
    </Container>
  );
}