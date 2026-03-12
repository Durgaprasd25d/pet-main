const express = require("express");
const router = express.Router();
const {
  createEmergency,
  getEmergencies,
  updateEmergencyStatus,
} = require("../controllers/emergencyController");
const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .post(protect, createEmergency)
  .get(protect, getEmergencies);

router.route("/:id")
  .put(protect, updateEmergencyStatus);

module.exports = router;
