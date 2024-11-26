import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const OrderManagement = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">SAM E-GlowCo Admin</div>
        <nav>
          <ul className="admin-nav-list">
            <li><Link to="/admin-dashboard" className="admin-nav-link">Dashboard</Link></li>
            <li><Link to="/product_manage" className="admin-nav-link">Manage Products</Link></li>
            <li><Link to="/manage-orders" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/view-orders" className="admin-nav-link">Manage Transactions</Link></li>
            <li><Link to="/admin-profile" className="admin-nav-link">Analytics</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Manage Orders</h1>
        <div className="manage-options">
          <Link to="/view-product" className="manage-option-btn">View products</Link>
          <Link to="/add-product" className="manage-option-btn">Add products</Link>
          <Link to="/update-product" className="manage-option-btn">Update products</Link>
          <Link to="/delete-product" className="manage-option-btn">Delete products</Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2024 SAM E-GlowCo. All Rights Reserved.</p>
        <div className="group-members">
          <span>Samra Saleem</span>
          <span>Muskan Tariq</span>
          <span>Amna Hassan</span>
        </div>
      </footer>
    </div>
  );
};

export default OrderManagement;
