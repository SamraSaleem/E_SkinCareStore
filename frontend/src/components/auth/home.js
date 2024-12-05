import { Link } from 'react-router-dom';
import './auth.css';
import Footer from './Footer';
const Home = () => {


  const values = [
    {
      icon: "🌿",
      title: "Natural Ingredients",
      description: "We prioritize natural, sustainable ingredients in all our products."
    },
    {
      icon: "🐰", 
      title: "Cruelty-Free",
      description: "All our products are cruelty-free and never tested on animals."
    },
    {
      icon: "♻️",
      title: "Sustainable", 
      description: "Committed to eco-friendly practices and sustainable packaging."
    },
    {
      icon: "💝",
      title: "Customer First",
      description: "Your satisfaction and skin health are our top priorities."
    }
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">SAM E-GlowCo</div>
        <nav>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/register" className="nav-link">Register</Link></li>
            <li><Link to="/login" className="nav-link">Login</Link></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Discover Your Natural Radiance</h1>
          <p>Experience luxury skincare with natural ingredients</p>
          <div className="hero-buttons">
            <button className="primary-btn">Shop Now</button>
            <button className="secondary-btn">Learn More</button>
          </div>
          <div className="hero-features">
            <div className="feature">
              <span>✨</span>
              <p>Natural Ingredients</p>
            </div>
            <div className="feature">
              <span>🌿</span>
              <p>Cruelty Free</p>
            </div>
            <div className="feature">
              <span>💝</span>
              <p>Dermatologist Tested</p>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="values-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {values.slice(0,4).map((value, index) => (
              <div key={index} className="value-item" style={{ flex: 1, margin: '0 10px' }}>
                <i>{value.icon}</i>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="value-item" style={{ flex: 1, margin: '0 10px' }}>
              <i>🌟</i>
              <h3>Premium Quality</h3>
              <p>Only the highest quality ingredients and formulations in our products.</p>
            </div>
            <div className="value-item" style={{ flex: 1, margin: '0 10px' }}>
              <i>🌍</i>
              <h3>Global Reach</h3>
              <p>Serving customers worldwide with international shipping options.</p>
            </div>
            <div className="value-item" style={{ flex: 1, margin: '0 10px' }}>
              <i>💯</i>
              <h3>Satisfaction Guaranteed</h3>
              <p>100% satisfaction guarantee with our hassle-free return policy.</p>
            </div>
            <div className="value-item" style={{ flex: 1, margin: '0 10px' }}>
              <i>🔬</i>
              <h3>Scientifically Proven</h3>
              <p>All products are dermatologically tested and scientifically proven.</p>
            </div>
          </div>
        </div>
      </main>

    {/* Footer */}
    <Footer />
    </div>
  );
};

export default Home;
