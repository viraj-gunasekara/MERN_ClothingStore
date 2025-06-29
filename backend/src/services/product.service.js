const Category = require("../models/category.model");
const Product = require("../models/product.model");

// Create a new product
// and its category hierarchy if not already present (Men>Clothing>Tshirts)
async function createProduct(reqData) {
  //Check if the top-level category ("Men", "Women") exists
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

  //if not exist, create it
  if (!topLevel) {
    const topLevelCategory = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });

    topLevel = await topLevelCategory.save();
  }

  //Check if second-level category ("Clothing", "Shoes") exists under top-level
  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  //if not exist, create it
  if (!secondLevel) {
    const secondLevelCategory = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });

    secondLevel = await secondLevelCategory.save();
  }

  //Check if third-level category ("T-Shirts", "Jeans") exists under second-level
  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  //if not exist, create it
  if (!thirdLevel) {
    const thirdLevelCategory = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });

    thirdLevel = await thirdLevelCategory.save();
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
    category: thirdLevel._id, //Assign product to third-level category
  });

  //Save the product document to the database
  const savedProduct = await product.save();

  return savedProduct;
}

// Delete a product by ID
async function deleteProduct(productId) {
  //find the product by its ID
  const product = await findProductById(productId);

  //product does not exist, under the id
  if (!product) {
    throw new Error("product not found with id : " + productId);
  }

  //if product exists, delete it from the db using its ID
  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  // 1. Find or create category hierarchy
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = await new Category({
      name: reqData.topLevelCategory,
      level: 1,
    }).save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = await new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    }).save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = await new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    }).save();
  }

  // 2. Assign resolved third level category to reqData
  reqData.category = thirdLevel._id;

  // 3. Remove temporary fields
  delete reqData.topLevelCategory;
  delete reqData.secondLevelCategory;
  delete reqData.thirdLevelCategory;

  // 4. Update the product
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, {
    new: true,
  });

  return updatedProduct;
}

/* helper functions */
// Find a product by ID & its belong category
async function findProductById(id) {
  const product = await Product.findById(id)
    .populate({
      path: "category",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    })
    .exec();

  //if no product found with the given ID
  if (!product) {
    throw new Error("Product not found with id " + id);
  }

  //if found, return the product document
  return product;
}

// Helper to find category by full hierarchy
async function getCategoryByHierarchy(levelOne, levelTwo, levelThree) {
  const parentParent = await Category.findOne({ name: levelOne });
  if (!parentParent) return null;

  const parent = await Category.findOne({
    name: levelTwo,
    parentCategory: parentParent._id,
  });
  if (!parent) return null;

  const category = await Category.findOne({
    name: levelThree,
    parentCategory: parent._id,
  });
  return category;
}

// Get all products with
// filtering and
// pagination
async function getAllProducts(reqQuery) {
  //Destructure query parameters from request query obj
  let {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  //Set default values if not provided //10 items per page, 1 page
  (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);

  //Start a base query to find all products and populate their category
  let query = Product.find().populate({
    path: "category",
    populate: {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
      },
    },
  });

  //Filter by Category
  if (category) {
    let fullCategory = category;
    if (reqQuery.levelOne && reqQuery.levelTwo) {
      fullCategory = await getCategoryByHierarchy(
        reqQuery.levelOne,
        reqQuery.levelTwo,
        category
      );
    } else {
      fullCategory = await Category.findOne({ name: category });
    }

    if (fullCategory) query = query.where("category").equals(fullCategory._id);
    else return { content: [], currentPage: 1, totalPages: 1 };
  }

  //Filter by Color
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  //Filter by Size
  if (sizes) {
    const sizesSet = new Set(sizes);

    query = query.where("sizes.name").in([...sizesSet]);
  }

  //Filter by Price Range
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  //Filter by min Dis value
  if (minDiscount !== undefined && minDiscount !== null) {
    query = query.where("discountPersent").gte(Number(minDiscount));
  }

  //Filter by Stock Status
  if (stock) {
    if (stock === "in_stock") {
      //Products with quantity greater than 0
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      //Products with quantity greater than 1
      query = query.where("quantity").lte(0);
    }
  }

  //Sorting by Price
  if (sort === "price_high" || sort === "price_low") {
  const sortDirection = sort === "price_high" ? -1 : 1;
  query = query.sort({ discountedPrice: sortDirection });
} else {
  // Default to showing most recently created products first
  query = query.sort({ createdAt: -1 });
}

  // Apply pagination
  //Count total number of products matching the current filter
  const totalProducts = await Product.countDocuments(query);

  //Calculate how many documents to skip based on page number
  const skip = (pageNumber - 1) * pageSize;

  //Apply skip and limit to paginate results
  query = query.skip(skip).limit(pageSize);

  //Execute the query to retrieve final product list
  const products = await query.exec();

  //Calculate total number of pages based on total products and page size
  const totalPages = Math.ceil(totalProducts / pageSize);

  //Return the paginated and filtered result
  return { content: products, currentPage: pageNumber, totalPages: totalPages };
}

//Batch Products Creation Function
async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

//Search Product using query
async function searchProduct(query) {
  // Searches title or description for the query string (fix-case-insensitivity)
  const products = await Product.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  }).populate("category");

  return products;
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
  searchProduct,
  getCategoryByHierarchy,
};
