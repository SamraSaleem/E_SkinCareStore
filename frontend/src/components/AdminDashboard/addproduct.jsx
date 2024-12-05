import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Importing Link here
import './admin.css'; // Assuming the same styles are used for both pages
import Footer from "../auth/Footer";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",  // Single image as a string (URL or file path)
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null); // Store token in state

  // Fetch the token when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      console.log("Token retrieved from localStorage:", storedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []); // Run once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setProductData({ ...productData, image: file }); // Store file object or URL as string
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('stock', productData.stock);
  
    if (productData.image) {
      formData.append('image', productData.image); // Append the file
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/product/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    });
      console.log('Product added successfully', response.data);
      setMessage("Product added successfully!");
      setError(""); // Clear any errors
      // Reset the form after 5 seconds
      setTimeout(() => {
        setProductData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: "",
        });
      }, 5000); // Clear the form after 5 seconds
    } catch (error) {
      console.error(error);
      setError("Error uploading product.");
      setMessage(""); // Clear success message
    }
  };
  

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

      {/* Main Content */}
      <main className="main-content">
        <h1>Add New Product</h1>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
         
          <div>
            <label>Category:</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>-- Select Category --</option>
              <option value="moisturizer">Moisturizer</option>
              <option value="serum">Serum</option>
              <option value="toner">Toner</option>
              <option value="facewash">Facewash</option>
              <option value="sunscreen">Sunscreen</option>
            </select>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddProduct;
