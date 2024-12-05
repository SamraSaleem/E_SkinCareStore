import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../auth/Footer";
import "./admin.css";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderSummaryVisibility, setOrderSummaryVisibility] = useState({});

  // Valid statuses as per Mongoose model
  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
        setOrderSummaryVisibility(
          response.data.reduce((acc, order) => ({ ...acc, [order._id]: true }), {})
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSearch = () => {
    const filtered = orders.filter((order) =>
      order.orderID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  const toggleOrderSummary = (orderId) => {
    setOrderSummaryVisibility((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    // Only proceed if the new status is valid
    if (!statuses.includes(newStatus)) {
      alert("Invalid status selected.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3001/api/orders/status/${orderId}`,  // Use orderID as parameter
        { orderStatus: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Order status updated:', response.data);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

      <main>
        <h1>View Orders</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === "") {
                setFilteredOrders(orders);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="search-input"
          />
        </div>

        {/* Orders List */}
        <div>
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="order-list">
              {filteredOrders.map((order) => (
                <li key={order._id} className="order-box">
                  <div className="order-id">
                    <h3>{order.orderID}</h3>
                  </div>
                  <button
                    onClick={() => toggleOrderSummary(order._id)}
                    className="toggle-summary-btn"
                  >
                    {orderSummaryVisibility[order._id]
                      ? "Hide Order Summary"
                      : "Show Order Summary"}
                  </button>
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
                            <p>
                              <strong>Product Name:</strong> {item.name}
                            </p>
                            <p>
                              <strong>Quantity:</strong> {item.qty}
                            </p>
                            <p>
                              <strong>Price:</strong> ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="status-dropdown">
                    <label htmlFor={`status-${order._id}`}>Status:</label>
                    <select
                      id={`status-${order._id}`}
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OrderStatus;
