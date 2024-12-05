import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './admin.css';
import Footer from '../auth/Footer';
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product/get");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);


  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearchQuery =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter ? product.category === categoryFilter : true;

    return matchesSearchQuery && matchesCategory;
  });

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
        <h1>Products</h1>

        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="category-filter">
            <select value={categoryFilter} onChange={handleCategoryFilterChange}>
              <option value="">Filter by Category</option>
              <option value="moisturizer">Moisturizer</option>
              <option value="serum">Serum</option>
              <option value="toner">Toner</option>
              <option value="facewash">Facewash</option>
              <option value="sunscreen">Sunscreen</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={`http://localhost:3001/uploads/${product.image}`}
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ViewProducts;
