import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
import Footer from '../auth/Footer';
const RefundReports = () => {
  const [refundStats, setRefundStats] = useState({
    totalRefunds: 0,
    pendingRefunds: 0,
    completedRefunds: 0,
    totalRefundAmount: 0,
  });
  const [recentRefunds, setRecentRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRefundData();
  }, []);

  const fetchRefundData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/orders/refund-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setRefundStats(response.data.stats);
      setRecentRefunds(response.data.recentRefunds);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch refund statistics');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Loading refund data...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="home-container">
      <header className="admin-header">
        <div className="logo">SAM E-GlowCo Admin</div>
        <nav>
          <ul className="admin-nav-list">
            <li><Link to="/admin-dashboard" className="admin-nav-link">Dashboard</Link></li>
            <li><Link to="/product_manage" className="admin-nav-link">Manage Products</Link></li>
            <li><Link to="/order_manage" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/transaction_manage" className="admin-nav-link">Manage Transactions</Link></li>
            <li><Link to="/analytics	" className="admin-nav-link">Analytics</Link></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="page-title">Refund Reports & Statistics</h1>

        <div className="stats-grid">
          <div className="stats-card">
            <h3>Total Refunds</h3>
            <p className="stats-number">{refundStats.totalRefunds}</p>
          </div>

          <div className="stats-card">
            <h3>Pending Refunds</h3>
            <p className="stats-number">{refundStats.pendingRefunds}</p>
          </div>

          <div className="stats-card">
            <h3>Completed Refunds</h3>
            <p className="stats-number">{refundStats.completedRefunds}</p>
          </div>

          <div className="stats-card">
            <h3>Total Refund Amount</h3>
            <p className="stats-number">${refundStats.totalRefundAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="table-container">
          <table className="refund-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Refund Amount</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Process Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRefunds.map((refund) => (
                <tr key={refund._id}>
                  <td>{refund.orderID}</td>
                  <td>{refund.user.name}</td>
                  <td>${refund.refundAmount.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${refund.refundStatus.toLowerCase()}`}>
                      {refund.refundStatus}
                    </span>
                  </td>
                  <td>{new Date(refund.refundRequestedAt).toLocaleDateString()}</td>
                  <td>
                    {refund.refundProcessedAt 
                      ? new Date(refund.refundProcessedAt).toLocaleDateString()
                      : 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RefundReports; 