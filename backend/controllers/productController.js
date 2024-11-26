const Product = require('../models/productmodel');

// Add Product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        // Validate required fields
        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({ error: 'All fields except image are required.' });
        }

        // Save the product to the database
        const product = await Product.create({ name, description, price, category, stock, image });
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name } = req.params; // Extract product name from params
        const { description, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : null;

        // Find the product by name
        const product = await Product.findOne({ name });

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        // Update the product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        if (image) product.image = image;

        // Save the updated product
        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

const getProductByName = async (req, res) => {
    try {
      const { name } = req.params;
  
      // Find product by name using a case-insensitive search
      const product = await Product.findOne({ name: new RegExp(`^${name}$`, "i") });
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
const getAllProducts = async (req, res) => {
        try {
          const products = await Product.find(); // Assuming you're using Mongoose
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch products", error });
        }
      }
      
module.exports = { addProduct, updateProduct, getProductByName, getAllProducts  };
