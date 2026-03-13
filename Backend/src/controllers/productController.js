const Product = require("../models/Product");
const cloudinary = require("../config/cloudinaryConfig");

// @desc    Get all products or filter by category
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, storeId } = req.query;
    let query = {};
    if (category) query.category = category;
    if (storeId) query.storeId = storeId;

    const products = await Product.find(query).populate(
      "storeId",
      "name email",
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "storeId",
      "name email",
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Store/Admin only)
exports.createProduct = async (req, res) => {
  const { name, category, price, stock, description } = req.body;

  try {
    let imageUrl =
      req.body.image ||
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=400"; // Placeholder

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", folder: "pet_products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          },
        );
        uploadStream.end(req.file.buffer);
      });
    }

    const product = new Product({
      storeId: req.user._id,
      name,
      category,
      price,
      stock,
      description,
      image: imageUrl,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Store/Admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (
      product &&
      (product.storeId.toString() === req.user._id.toString() ||
        req.user.role === "admin")
    ) {
      product.name = req.body.name || product.name;
      product.category = req.body.category || product.category;
      product.price = req.body.price || product.price;
      product.stock =
        req.body.stock !== undefined ? req.body.stock : product.stock;
      product.description = req.body.description || product.description;

      if (req.file) {
        product.image = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto", folder: "pet_products" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            },
          );
          uploadStream.end(req.file.buffer);
        });
      } else if (req.body.image) {
        product.image = req.body.image;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found or unauthorized" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Store/Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (
      product &&
      (product.storeId.toString() === req.user._id.toString() ||
        req.user.role === "admin")
    ) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get categories
// @route   GET /api/products/categories
// @access  Public
exports.getCategories = async (req, res) => {
  const categories = [
    "Food",
    "Toys",
    "Grooming",
    "Health",
    "Accessories",
    "Bedding",
    "Training",
    "Other",
  ];
  res.json(categories);
};
