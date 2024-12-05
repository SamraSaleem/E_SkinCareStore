import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/auth/home";
import AdminWelcome from "./components/AdminDashboard/adminwelcome";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NotFound from "./components/auth/notfoundpage";
import ProductManagement from "./components/AdminDashboard/productMng"; 
import AddProduct from "./components/AdminDashboard/addproduct";
import UpdateProduct from "./components/AdminDashboard/upadteproduct";
import DeleteProducts from "./components/AdminDashboard/deleteproduct";
import ViewProduct from "./components/AdminDashboard/viewproduct";
import OrderManagement from "./components/AdminDashboard/OrderMng";
import ViewOrder from "./components/AdminDashboard/viewOrders";
import OrderStatus from "./components/AdminDashboard/orderStatus";
import RefundManagement from "./components/AdminDashboard/RefundManagement";
import RefundReports from './components/AdminDashboard/RefundReports';
import TransactionManagement from './components/AdminDashboard/TransactionManagement';
import Analytics from './components/AdminDashboard/Analytics';
import FAQs from './components/auth/FAQs';
import Blogs from './components/auth/Blogs';
import About from './components/auth/About';
import Contact from './components/auth/Contact';
import RefundPolicy from './components/auth/RefundPolicy';
import PrivacyPolicy from './components/auth/PrivacyPolicy';
import ShipmentPolicy from './components/auth/ShipmentPolicy';
import Terms from './components/auth/Terms';
import BlogPost from './components/auth/BlogPost';
import Footer from './components/auth/Footer';
function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin-dashboard" element={<AdminWelcome />} />

        {/* Manage Products */}
        <Route path="/product_manage" element={<ProductManagement />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/delete-product" element={<DeleteProducts />} />
        <Route path="/view-product" element={<ViewProduct />} />
        
        {/* Manage Orders */}
        <Route path="/order_manage" element={<OrderManagement />} />
        <Route path="/view_order" element={<ViewOrder />} />
        <Route path="/order_status" element={<OrderStatus />} />
        <Route path="/refund_management" element={<RefundManagement />} />
        <Route path="/refund_reports" element={<RefundReports />} />
        <Route path="/transaction_manage" element={<TransactionManagement />} />
        <Route path="/analytics" element={<Analytics />} />

        {/* About section routes */}
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipment-policy" element={<ShipmentPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Blog Post Route */}
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/footer" element={<Footer />} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
