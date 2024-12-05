import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
import Footer from '../auth/Footer';
const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:3001/api/transactions/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.data) {
        throw new Error('No data received from server');
      }

      const formattedTransactions = response.data.map(transaction => ({
        _id: transaction._id,
        transactionId: transaction.transactionId || `TRX-${transaction.orderID}`,
        orderID: transaction.orderID,
        user: {
          name: transaction.user?.name || 'N/A',
          email: transaction.user?.email || 'N/A'
        },
        amount: transaction.amount || transaction.totalPrice || 0,
        status: transaction.isRefunded ? 'refunded' : 
                transaction.isPaid ? 'completed' : 
                'pending',
        paymentMethod: transaction.paymentMethod || 'N/A',
        createdAt: transaction.createdAt || transaction.paidAt || new Date(),
      }));

      setTransactions(formattedTransactions);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Update this effect to call fetchTransactions directly
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchTransactions();
    }
  }, [dateRange, fetchTransactions]);

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesSearch = 
        (transaction.orderID?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (transaction.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      
      const transactionDate = new Date(transaction.createdAt);
      const matchesDate = 
        (!dateRange.start || transactionDate >= new Date(dateRange.start)) &&
        (!dateRange.end || transactionDate <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-badge completed';
      case 'pending':
        return 'status-badge pending';
      case 'refunded':
        return 'status-badge refunded';
      default:
        return 'status-badge';
    }
  };

  if (loading) return <div className="loading-state">Loading transaction data...</div>;
  if (error) return <div className="error-state">{error}</div>;

  const filteredTransactions = getFilteredTransactions();

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
            <li><Link to="/analytics" className="admin-nav-link">Analytics</Link></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="page-title">Transaction History</h1>

        <div className="transaction-stats">
          <div className="stats-card">
            <h3>Total Transactions</h3>
            <p className="stats-number">{transactions.length}</p>
          </div>
          <div className="stats-card">
            <h3>Total Amount</h3>
            <p className="stats-number">
              ${transactions.reduce((sum, t) => sum + (t.amount || 0), 0).toFixed(2)}
            </p>
          </div>
          <div className="stats-card">
            <h3>Completed Payments</h3>
            <p className="stats-number">
              {transactions.filter(t => t.status === 'completed').length}
            </p>
          </div>
          <div className="stats-card">
            <h3>Refunded Payments</h3>
            <p className="stats-number">
              {transactions.filter(t => t.status === 'refunded').length}
            </p>
          </div>
        </div>

        <div className="filters-section">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>

          <div className="date-filters">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="date-input"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="date-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-transactions">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="transaction-row">
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.orderID}</td>
                    <td className="customer-name">
                      {transaction.user?.name || 'N/A'}
                    </td>
                    <td>${(transaction.amount || 0).toFixed(2)}</td>
                    <td>
                      <span className={getStatusColor(transaction.status || 'pending')}>
                        {transaction.status || 'pending'}
                      </span>
                    </td>
                    <td>{transaction.paymentMethod || 'N/A'}</td>
                    <td>
                      <div>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                      <div className="transaction-time">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TransactionManagement;