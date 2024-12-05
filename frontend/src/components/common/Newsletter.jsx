import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/newsletter/subscribe', { email });
      setMessage('Successfully subscribed to newsletter!');
      setEmail('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="newsletter-form">
      <input 
        type="email" 
        placeholder="Enter Your Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button 
        type="submit" 
        onClick={handleSubscribe}
        style={{ 
          padding: '0.5rem 1rem',
          backgroundColor: 'white',
          color: '#e83e8c',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Subscribe
      </button>
      {message && <p className="newsletter-message">{message}</p>}
    </div>
  );
};

export default Newsletter; 