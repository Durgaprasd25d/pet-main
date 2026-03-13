const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  getStoreOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createOrder);
router.get("/user", protect, getMyOrders);
router.get("/store", protect, getStoreOrders);
router.route("/:id").get(protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;
