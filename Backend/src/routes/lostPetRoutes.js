const express = require("express");
const router = express.Router();
const {
  reportLostPet,
  getLostPets,
  getLostPetById,
  updateLostPetStatus,
} = require("../controllers/lostPetController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getLostPets).post(protect, reportLostPet);

router.route("/:id").get(getLostPetById).put(protect, updateLostPetStatus);

module.exports = router;
