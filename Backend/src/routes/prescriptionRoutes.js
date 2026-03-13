const express = require("express");
const router = express.Router();
const {
  getPrescriptions,
  createPrescription,
  getPrescriptionById,
  deletePrescription,
} = require("../controllers/prescriptionController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getPrescriptions)
  .post(protect, createPrescription);

router
  .route("/:id")
  .get(protect, getPrescriptionById)
  .delete(protect, deletePrescription);

module.exports = router;
