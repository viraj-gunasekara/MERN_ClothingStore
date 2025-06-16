const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");
//checks if the request is by valid JWT
const authenticate = require("../middleware/authenticate.js");

// Create a single product
router.post('/', authenticate, productController.createProduct);
// Create set of products
router.post('/creates', authenticate, productController.createMultipleProduct);
// Delete a product by its ID
router.delete('/:id', authenticate, productController.deleteProduct);
// Update a product by its ID
router.put('/:id', authenticate, productController.updateProduct);

module.exports=router;