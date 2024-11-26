const express = require('express');
const { addProduct, updateProduct, getProductByName , getAllProducts} = require('../controllers/productController');
const { verifyAdmin } = require('../middleware/adminMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

// Add a new product
router.post('/add', upload.single('image'), verifyAdmin, addProduct);

// Update an existing product
router.put('/update/:name', upload.single('image'), verifyAdmin, updateProduct);

// Ensure the backend API accepts the name parameter
router.get('/get/:name', getProductByName);

router.get('/get', getAllProducts);

module.exports = router;
