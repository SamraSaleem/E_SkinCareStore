import React, { useState } from 'react';
import axios from 'axios';

const RequestRefund = ({ orderId, totalAmount }) => {
  const [reason, setReason] = useState('');
  const [notification, setNotification] = useState(null);

  const handleRefundRequest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/orders/request-refund', {
        orderId,
        reason,
        amount: totalAmount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotification('Refund request submitted successfully');
      setReason('');
    } catch (error) {
      setNotification('Failed to submit refund request');
    }
  };

  return (
    <div className="refund-request-form">
      <h3>Request Refund</h3>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleRefundRequest}>
        <div className="form-group">
          <label>Reason for Refund:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="Please explain why you want a refund..."
          />
        </div>
        <button type="submit" className="submit-btn">Submit Refund Request</button>
      </form>
    </div>
  );
};

export default RequestRefund; 