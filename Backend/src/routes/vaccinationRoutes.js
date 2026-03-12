const express = require("express");
const router = express.Router();
const {
  getVaccinationsByPet,
  addVaccination,
} = require("../controllers/vaccinationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addVaccination);
router.get("/pet/:petId", protect, getVaccinationsByPet);

module.exports = router;
