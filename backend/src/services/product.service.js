const Category = require("../models/category.model");
const Product = require("../models/product.model");

// Create a new product
// and its category hierarchy if not already present (Men>Clothing>Tshirts)
async function createProduct(reqData) {
  //Check if the top-level category ("Men", "Women") exists
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  //if not exist, create it
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
  }

  //Check if second-level category ("Clothing", "Shoes") exists under top-level
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  //if not exist, create it
  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
  }

  //Check if third-level category ("T-Shirts", "Jeans") exists under second-level
  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  //if not exist, create it
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
  }


  //Create a new Product document with the provided data
  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPersent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    sizes: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,  //Assign product to third-level category
  });

  //Save the product document to the database
  const savedProduct = await product.save();

  return savedProduct;
};


// Delete a product by ID
async function deleteProduct(productId) {
  //find the product by its ID
  const product = await findProductById(productId);

  //product does not exist, under the id
  if (!product) {
    throw new Error("product not found with id : " +productId);
  }

  //if product exists, delete it from the db using its ID
  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
};


// Update a product by ID
async function updateProduct(productId, reqData) {
  //ind the product by ID and update its fields with the new data (reqData)
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);

  //return the updated product document to db
  return updatedProduct;
};


/* helper functions */
// Find a product by ID & its belong category
async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  //if no product found with the given ID
  if (!product) {
    throw new Error("Product not found with id " + id);
  }

  //if found, return the product document
  return product;
};


module.exports = { createProduct, deleteProduct, updateProduct, findProductById };