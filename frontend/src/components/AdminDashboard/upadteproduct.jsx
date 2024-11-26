import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import './admin.css';

const UpdateProduct = () => {
  const { name } = useParams(); // Get product name from the route
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "", // Existing image URL or file
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  // Fetch token and product details when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  
    // Ensure name exists before making the request
    if (name) {
      // Fetch product details by name
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/product/get/${name}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setProductData(response.data); // Set existing product data
        } catch (error) {
          console.error("Error fetching product details:", error);
          setError("Unable to fetch product details.");
        }
      };
  
      fetchProduct();
    } else {
      setError("Product name is not valid.");
    }
  }, [name]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({ ...productData, image: file }); // Store file object
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("stock", productData.stock);

    if (productData.image instanceof File) {
      formData.append("image", productData.image); // Append the new file
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/product/update/${name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product updated successfully", response.data);
      setMessage("Product updated successfully!");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Error updating product.");
      setMessage("");
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
            <li><Link to="/manage-orders" className="admin-nav-link">Manage Orders</Link></li>
            <li><Link to="/view-orders" className="admin-nav-link">Manage Transactions</Link></li>
            <li><Link to="/admin-profile" className="admin-nav-link">Analytics</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>Update Product</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            {productData.image && !(productData.image instanceof File) && (
              <p>Current Image: <img src={productData.image} alt="Current Product" width="100" /></p>
            )}
          </div>
          <button type="submit">Update Product</button>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">© 2024 SAM E-GlowCo. All Rights Reserved.</p>
        <div className="group-members">
          <span>Samra Saleem</span>
          <span>Muskan Tariq</span>
          <span>Amna Hassan</span>
        </div>
      </footer>
    </div>
  );
};

export default UpdateProduct;
