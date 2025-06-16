const productService = require("../services/product.service.js")

// Create a new product
const createProduct = async(req, res)=>{
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Delete a product by ID
const deleteProduct = async(req, res)=>{
  //Extract product ID
  const productId = req.params.id;
  try {
    const message = await productService.deleteProduct(productId);
    return res.status(200).json({ message });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Update a product by ID
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    return res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Find a product by ID
async function findProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productService.findProductById(productId);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

// Find products by category
async function findProductByCategory(req, res) {
  try {
    const category = req.params.category;
    const products = await productService.findProductByCategory(category);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Search products by query
async function searchProduct(req, res) {
  try {
    const query = req.params.query;
    const products = await productService.searchProduct(query);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Get all products with filtering and pagination
async function getAllProducts(req, res) {
  try {

    const products = await productService.getAllProducts(req.query);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const createMultipleProduct= async (req, res) => {
  try {
    await productService.createMultipleProduct(req.body)
    return res.status(202).json({ message: "Products Created Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { createProduct, deleteProduct, updateProduct, getAllProducts, findProductById, 
  findProductByCategory, searchProduct, createMultipleProduct };
