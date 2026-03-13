const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/categories", getCategories);
router
  .route("/")
  .get(getProducts)
  .post(protect, upload.single("image"), createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, upload.single("image"), updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
