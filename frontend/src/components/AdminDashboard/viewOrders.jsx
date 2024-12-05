import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../auth/Footer';
const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderSummaryVisibility, setOrderSummaryVisibility] = useState({});
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', or 'desc'

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setFilteredOrders(response.data);
      setOrderSummaryVisibility(
        response.data.reduce((acc, order) => ({ ...acc, [order._id]: true }), {})
      );
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = orders.filter(order =>
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const toggleOrderSummary = (orderId) => {
    setOrderSummaryVisibility(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleSort = (direction) => {
    setSortOrder(direction);
    let sortedOrders = [...filteredOrders];
    
    if (direction === 'asc') {
      sortedOrders.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (direction === 'desc') {
      sortedOrders.sort((a, b) => b.totalPrice - a.totalPrice);
    }
    
    setFilteredOrders(sortedOrders);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

      <main>
        <h1>View Orders</h1>

        <div className="filters-section">
          {/* Search Bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by Order ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (e.target.value === '') {
                  setFilteredOrders(orders);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              className="search-input"
            />
          </div>

          {/* Sort Controls */}
          <div className="sort-controls">
            <label>Sort by Total:</label>
            <select 
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value)}
              className="sort-select"
            >
              <option value="none">None</option>
              <option value="asc">Lowest to Highest</option>
              <option value="desc">Highest to Lowest</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div>
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="order-list">
              {filteredOrders.map((order) => (
                <li key={order._id} className="order-box">
                  {/* Order ID */}
                  <div className="order-id">
                    <h3>{order.orderID}</h3>
                  </div>

                  {/* Toggle Order Summary */}
                  <button
                    onClick={() => toggleOrderSummary(order._id)}
                    className="toggle-summary-btn"
                  >
                    {orderSummaryVisibility[order._id] ? "Hide Order Summary" : "Show Order Summary"}
                  </button>

                  {/* Conditional Order Summary Rendering */}
                  {orderSummaryVisibility[order._id] && (
                    <div className="order-summary">
                      <h3>Order Summary</h3>
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="order-item">
                          <div className="item-image">
                            <img
                              src={`http://localhost:3001/uploads/${item.image}`}
                              alt={item.name}
                              width={100}
                            />
                          </div>
                          <div className="item-details">
                            <p><strong>Product Name:</strong> {item.name}</p>
                            <p><strong>Quantity:</strong> {item.qty}</p>
                            <p><strong>Price:</strong> ${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shipping and Billing Address Inline */}
                <div className="address-container">
                    {/* Customer Information */}
                <div className="address-box">
                    <h3 className="order-item" >Customer Information</h3>
                    <p><strong>Name:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> {order.user.email}</p>
                    <p><strong>Contact:</strong> {order.shippingAddress.contactNumber}</p>
                </div>
                    <div className="address-box">
                    <h3 className="order-item">Shipping Address</h3>
                    <p><strong>Address:</strong>{order.shippingAddress.address}</p>
                    <p><strong>City:</strong>{order.shippingAddress.city}</p>
                    
                    <p><strong>Country:</strong>{order.shippingAddress.country}</p>
                    </div>

                    <div className="address-box">
                    <h3 className="order-item">Billing Address</h3>
                    <p><strong>Address:</strong>{order.billingAddress.address}</p>
                    <p><strong>City:</strong>{order.billingAddress.city}</p>
                    
                    <p><strong>Country:</strong>{order.billingAddress.country}</p>
                    </div>

                    {/* Payment Information */}
                <div className="address-box">
                    <h3 className="order-item">Payment Information</h3>
                    <p><strong>Method:</strong> {order.paymentMethod}</p>
                    <p><strong>Status:</strong> {order.paymentResult.status}</p>
                    <p><strong>Total:</strong> ${order.totalPrice}</p>
                </div>
                </div>
                {/* Status Tracking */}
                <div className="order-status-tracking">
                    <h3 className="order-item">Status Tracking</h3>
                    <p><strong>Paid:</strong> {order.isPaid ? `Yes, at ${order.paidAt}` : 'No'}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                    <p><strong>Delivered:</strong> {order.isDelivered ? `Yes, at ${order.deliveredAt}` : 'No'}</p>
                </div>
                <div className="order-total">
                  <strong>Total Price: ${order.totalPrice.toFixed(2)}</strong>
                </div>
                </li>
            ))}
            </ul>
          )}
        </div>
      </main>

      
      <Footer />
    </div>
  );
};

export default ViewOrder;