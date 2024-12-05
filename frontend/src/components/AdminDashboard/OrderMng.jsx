import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import Footer from "../auth/Footer";
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
            <li><Link to="/order_manage" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/transaction_manage" className="admin-nav-link">Manage Transactions</Link></li>
            <li><Link to="/analytics" className="admin-nav-link">Analytics</Link></li>
            <li><Link to="/about" className="admin-nav-link">About Us</Link></li>
            <li><Link to="/contact" className="admin-nav-link">Contact</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Manage Orders</h1>
        <div className="manage-options">
          <Link to="/view_order" className="manage-option-btn">View Orders</Link>
          <Link to="/order_status" className="manage-option-btn">Order Status Management</Link>
          <Link to="/refund_management" className="manage-option-btn">Refund Management</Link>
          <Link to="/refund_reports" className="manage-option-btn">Refund Reports</Link>
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderManagement;
