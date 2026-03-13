const express = require("express");
const router = express.Router();
const {
  getVaccinationsByPet,
  addVaccination,
  deleteVaccination,
  getUpcomingVaccinations,
} = require("../controllers/vaccinationController");
const { protect } = require("../middleware/authMiddleware");

router.get("/upcoming", protect, getUpcomingVaccinations);
router.post("/", protect, addVaccination);
router.get("/pet/:petId", protect, getVaccinationsByPet);
router.delete("/:id", protect, deleteVaccination);

module.exports = router;
