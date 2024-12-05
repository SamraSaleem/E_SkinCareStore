import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import './auth.css';
import Footer from './Footer';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [systemPassword, setSystemPassword] = useState('');
  const [showAdminVerification, setShowAdminVerification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSystemPassword, setShowSystemPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const { token, user } = data;
      const { role } = user;

      if (role === 'admin') {
        // For admin, show system password verification
        setShowAdminVerification(true);
        setSuccessMessage('Please enter system password for admin verification');
      } else {
        // For non-admin users, proceed with normal login
        localStorage.setItem('token', token);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          window.location.href = role === 'user' ? '/user-dashboard' : '/seller-dashboard';
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleAdminVerification = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, systemPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Admin verification failed');
      }

      localStorage.setItem('token', data.token);
      setSuccessMessage('Admin verification successful! Redirecting...');
      setTimeout(() => {
        window.location.href = '/admin-dashboard';
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">SAM E-GlowCo</div>
        <nav>
          <ul className="nav-list">
            <li><a href="/" className="nav-link">Home</a></li>
            <li><a href="/register" className="nav-link">Register</a></li>
            <li><a href="/login" className="nav-link">Login</a></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h1>Login</h1>
        
        {!showAdminVerification ? (
          // Regular login form
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
            />
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required 
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  e.stopPropagation(); // Prevent event bubbling
                  setShowPassword(!showPassword);
                }}
                tabIndex="-1" // Remove from tab order
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit">Login</button>
          </form>
        ) : (
          // Admin verification form
          <div className="admin-verification">
            <h2>Admin Verification</h2>
            <p>Please enter the system password to access admin dashboard:</p>
            <div className="password-input-container">
              <input
                type={showSystemPassword ? "text" : "password"}
                value={systemPassword}
                onChange={(e) => setSystemPassword(e.target.value)}
                placeholder="System Password"
                className="system-password-input"
              />
              <button 
                type="button"
                className="password-toggle"
                onClick={() => setShowSystemPassword(!showSystemPassword)}
              >
                {showSystemPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="verification-buttons">
              <button onClick={handleAdminVerification}>Verify</button>
              <button onClick={() => setShowAdminVerification(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
