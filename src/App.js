import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './pages/sidebar';
import Anal from './pages/anal';
import Recs from './pages/recs';
import Login from './pages/login';
import Home from './pages/home';
import Callback from './pages/callback';

function App() {
  // const [accuracy, setAccuracy] = useState(2);
  // const [newConst, setNewConst] = useState(0);

  // useEffect(() => {
  //   fetch('/api/route')
  //     .then(res => res.json())
  //     .then(data => {
  //       setAccuracy(data.variable);
  //       setNewConst(data.variable2);
  //     });
  // }, []);

  let Component
  switch (window.location.pathname) {
    case '/':
      Component = Login
      break;
    case '/analytics':
      Component = Anal
      break;
    case '/recommendations':
      Component = Recs
      break;
    case '/home':
      Component = Home
      break;
    case '/api/callback':
      Component = Callback
      break;
    default:
      Component = Login
      break;
  }

  return (
    <Router>
      <Routes>
        {/* Standalone Login Page (no sidebar) */}
        <Route path="/" element={<Login />} />
        {/* Receive the code from Spotify at the /callback route. */}
        <Route path="/callback" element={<Callback />} />

        {/* All other pages wrapped with Sidebar */}
        <Route
          path="/*"
          element={
            <div className="App" style={{ display: 'flex' }}>
              <Sidebar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/analytics" element={<Anal />} />
                <Route path="/recommendations" element={<Recs />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
