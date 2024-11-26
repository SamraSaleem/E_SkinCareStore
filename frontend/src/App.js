import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/auth/home"; // Ensure this path is correct
import AdminWelcome from "./components/AdminDashboard/adminwelcome"; // Corrected to AdminWelcome.jsx
import Login from "./components/auth/login";
import Register from "./components/auth/register";
//import ProtectedRoute from "./components/auth/protectedRoute"; // Ensure this file handles role-based protection
import NotFound from "./components/auth/notfoundpage"; // Ensure this component exists
import OrderManagement from "./components/AdminDashboard/productMng"; 
import AddProduct from "./components/AdminDashboard/addproduct";
import UpdateProduct from "./components/AdminDashboard/upadteproduct";
import DeleteProduct from "./components/AdminDashboard/deleteproduct";
import ViewProduct from "./components/AdminDashboard/viewproduct";
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


        {/* Add Product Route */}
        {/* Manage Products */}
        <Route path="/product_manage" element={<OrderManagement />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/delete-product" element={<DeleteProduct />} />
        <Route path="/view-product" element={<ViewProduct />} />
        

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
