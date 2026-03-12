const express = require("express");
const router = express.Router();
const {
  createAdoption,
  getAdoptions,
  applyForAdoption,
  updateAdoptionStatus,
} = require("../controllers/adoptionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getAdoptions).post(protect, createAdoption);

router.post("/:id/apply", protect, applyForAdoption);
router.put("/:id", protect, updateAdoptionStatus);

module.exports = router;
