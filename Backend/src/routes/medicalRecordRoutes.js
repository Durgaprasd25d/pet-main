const express = require("express");
const router = express.Router();
const {
  addMedicalRecord,
  getMedicalRecordsByPet,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", protect, upload.single("document"), addMedicalRecord);
router.get("/pet/:petId", protect, getMedicalRecordsByPet);
router.delete("/:id", protect, deleteMedicalRecord);

module.exports = router;
