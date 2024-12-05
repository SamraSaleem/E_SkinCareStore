import { Link } from "react-router-dom";
import "./admin.css"; // Add styles here for your admin dashboard
import Footer from "../auth/Footer";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      {/* Navbar */}
      <header className="admin-header">
        <div className="logo">SAM E-GlowCo Admin</div>
        <nav>
        <ul className="admin-nav-list">
            <li><Link to="/admin-dashboard" className="admin-nav-link">Dashboard</Link></li>
            <li><Link to="/product_manage" className="admin-nav-link">Manage Products</Link></li>
            <li><Link to="/order_manage" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/transaction_manage" className="admin-nav-link">Manage Transactions</Link></li>
            <li><Link to="/analytics" className="admin-nav-link">Analytics</Link></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* Body */}
      <main className="admin-main-content">
        <h1>Welcome to Admin Dashboard</h1>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AdminDashboard;
