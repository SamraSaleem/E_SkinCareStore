import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import Footer from "../auth/Footer";
const ProductManagement = () => {
  return (
    <div className="home-container">
      {/* Header */}
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

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Manage Products</h1>
        <div className="manage-options">
          <Link to="/view-product" className="manage-option-btn">View products</Link>
          <Link to="/add-product" className="manage-option-btn">Add products</Link>
          <Link to="/update-product" className="manage-option-btn">Update products</Link>
          <Link to="/delete-product" className="manage-option-btn">Delete products</Link>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductManagement;