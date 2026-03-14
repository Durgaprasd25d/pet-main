const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  verifyOTP,
  resendOTP,
  updateUserProfile,
  verifyUser,
  deleteUser,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single("avatar"), updateUserProfile);
router.put("/change-password", protect, changePassword);

router.get("/users", protect, getUsers);
router.put("/users/:id/verify", protect, verifyUser);
router.delete("/users/:id", protect, deleteUser);

module.exports = router;
