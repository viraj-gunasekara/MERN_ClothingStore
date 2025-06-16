const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller.js");

//customer - Get all products
router.get('/', productController.getAllProducts);
//customer - Get single product by its ID
router.get('/id/:id', productController.findProductById);
//search products by a search query
router.get('/search', productController.searchProduct);


module.exports = router;