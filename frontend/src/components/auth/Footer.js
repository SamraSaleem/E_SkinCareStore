import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer style={{ backgroundColor: '#e83e8c', color: 'white', fontSize: '0.9rem' }}>


      {/* Main Footer Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem'
      }}>

        {/* Contact Info */}
        <div>
          <h3 style={{ 
            fontSize: '1rem', 
            marginBottom: '1.2rem',
            fontWeight: '600',
            textAlign: 'left',
            paddingLeft: '2.3rem'
          }}>Contact Us</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.8rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaEnvelope /> <span>Support@sameglow.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaPhone /> <span>+92-21-37133288</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaClock /> <span>10am - 7pm, Mon - Sat</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={{ 
            fontSize: '1rem', 
            marginBottom: '1.2rem',
            fontWeight: '600',
            textAlign: 'center'
          }}>Quick Links</h3>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.8rem 1rem',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            <a href="/faqs" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>FAQs</a>
            <a href="/blogs" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>Blogs</a>
            
            <a href="/shipment-policy" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>Shipping</a>
            <a href="/terms" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>Terms</a>
            <a href="/refund-policy" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>Refund Policy</a>
            <a href="/privacy-policy" style={{ 
              color: 'white', 
              textDecoration: 'none'
            }}>Privacy Policy</a>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 style={{ 
            fontSize: '1rem', 
            marginBottom: '1.2rem',
            fontWeight: '600',
            textAlign: 'right',
            paddingRight: '1rem'
          }}>Follow Us</h3>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <a href="https://facebook.com/sameglow" 
               target="_blank" 
               rel="noopener noreferrer" 
               style={{ 
                 color: 'white',
                 backgroundColor: 'rgba(255,255,255,0.1)',
                 padding: '0.5rem',
                 borderRadius: '50%',
                 display: 'flex',
                 transition: 'transform 0.3s ease'
               }}
               onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
               onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/sameglow" 
               target="_blank" 
               rel="noopener noreferrer" 
               style={{ 
                 color: 'white',
                 backgroundColor: 'rgba(255,255,255,0.1)',
                 padding: '0.5rem',
                 borderRadius: '50%',
                 display: 'flex',
                 transition: 'transform 0.3s ease'
               }}
               onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
               onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaInstagram />
            </a>
            <a href="https://youtube.com/sameglow" 
               target="_blank" 
               rel="noopener noreferrer" 
               style={{ 
                 color: 'white',
                 backgroundColor: 'rgba(255,255,255,0.1)',
                 padding: '0.5rem',
                 borderRadius: '50%',
                 display: 'flex',
                 transition: 'transform 0.3s ease'
               }}
               onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
               onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)'
      }}>
        <p>© 2024 SAM E-GlowCo. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;