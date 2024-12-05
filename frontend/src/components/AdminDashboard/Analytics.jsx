import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../auth/Footer';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import './admin.css';

const Analytics = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Here you can add logic to handle the subscription
    console.log('Subscribed email:', email);
    setEmail(''); // Clear the email field
  };


  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/analytics/sales', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch analytics data');
      setLoading(false);
    }
  };

  const formatMonthlyData = (data) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return data.map(item => ({
      month: months[item._id.month - 1],
      revenue: parseFloat(item.revenue.toFixed(2)),
      orders: item.orders
    })).reverse(); // Show oldest to newest
  };

  const formatCurrency = (value) => {
    return `$${value.toFixed(2)}`;
  };

  const COLORS = {
    category: ['#e83e8c', '#28a745', '#17a2b8', '#ffc107', '#dc3545'],  // Main color scheme
    barChart: {
      revenue: '#e83e8c',    // Pink
      orders: '#28a745',     // Green
    }
  };

  const gradientOffset = () => {
    if (!analytics?.monthlyRevenue?.length) return 0;
    const dataMax = Math.max(...analytics.monthlyRevenue.map(item => item.revenue));
    const dataMin = Math.min(...analytics.monthlyRevenue.map(item => item.revenue));
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  };

  const formatCategoryData = (categoryPerformance, categories) => {
    // Ensure all categories are represented
    return categories.map(category => {
      const categoryData = categoryPerformance.find(item => item._id === category);
      return {
        _id: category,
        revenue: categoryData ? categoryData.revenue : 0,
        totalSold: categoryData ? categoryData.totalSold : 0
      };
    });
  };

  if (loading) return <div className="loading-state">Loading analytics data...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!analytics) return null;

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
            <li><Link to="/analytics" className="admin-nav-link active">Analytics</Link></li>
            <li><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></li>
            <li><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main className="analytics-content">
        <h1 className="page-title">Sales Analytics</h1>

        <div className="stats-overview">
          <div className="stats-card">
            <h3>Total Revenue</h3>
            <p className="stats-number">
              {formatCurrency(analytics.salesStats.totalRevenue)}
            </p>
          </div>
          <div className="stats-card">
            <h3>Total Orders</h3>
            <p className="stats-number">
              {analytics.salesStats.totalOrders}
            </p>
          </div>
          <div className="stats-card">
            <h3>Average Order Value</h3>
            <p className="stats-number">
              {formatCurrency(analytics.salesStats.averageOrderValue)}
            </p>
          </div>
        </div>

        <div className="charts-container">
          {/* Monthly Revenue Bar Chart */}
          <div className="chart-section">
            <h2>Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={formatMonthlyData(analytics.monthlyRevenue)}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: '#333', fontSize: 12 }}
                />
                <YAxis
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#333' }}
                  label={{ 
                    value: 'Revenue (USD)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#333', fontSize: 14 }
                  }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e83e8c',
                    borderRadius: '4px',
                    padding: '10px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar 
                  dataKey="revenue" 
                  name="Revenue"
                  radius={[4, 4, 0, 0]}
                >
                  {
                    formatMonthlyData(analytics.monthlyRevenue).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS.category[index % COLORS.category.length]}
                      />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product Performance Chart */}
          <div className="chart-section">
            <h2>Top Products by Revenue</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={analytics.productPerformance.slice(0, 5)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  type="number" 
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#333' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={100}
                  tick={{ fill: '#333', fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e83e8c',
                    borderRadius: '4px',
                    padding: '10px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar 
                  dataKey="revenue" 
                  fill={COLORS.category[0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance Pie Chart - Keep as is */}
          <div className="chart-section">
            <h2>Revenue by Category</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={formatCategoryData(analytics.categoryPerformance, analytics.categories)}
                  dataKey="revenue"
                  nameKey="_id"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, percent }) => 
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {analytics.categories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.category[index % COLORS.category.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [
                    formatCurrency(value),
                    `Category: ${name}`
                  ]}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e83e8c',
                    borderRadius: '4px',
                    padding: '10px'
                  }}
                />
                <Legend 
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Orders Line Chart */}
          <div className="chart-section">
            <h2>Monthly Orders Trend</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={formatMonthlyData(analytics.monthlyRevenue)}
                margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="month"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: '#333', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#333' }}
                  label={{ 
                    value: 'Number of Orders', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: '#333', fontSize: 14 }
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #28a745',
                    borderRadius: '4px',
                    padding: '10px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke={COLORS.barChart.orders}
                  strokeWidth={3}
                  dot={{ 
                    r: 6, 
                    fill: 'white',
                    stroke: COLORS.barChart.orders,
                    strokeWidth: 2
                  }}
                  activeDot={{ 
                    r: 8,
                    stroke: COLORS.barChart.orders,
                    strokeWidth: 2
                  }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Analytics; 