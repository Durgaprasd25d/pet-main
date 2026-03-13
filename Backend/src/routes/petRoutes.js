const express = require("express");
const router = express.Router();
const {
  getPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  getPetHistory,
} = require("../controllers/petController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .get(protect, getPets)
  .post(protect, upload.single("image"), createPet);

router
  .route("/:id")
  .get(protect, getPetById)
  .put(protect, upload.single("image"), updatePet)
  .delete(protect, deletePet);

router.get("/:id/history", protect, getPetHistory);
router.get("/:id/health", protect, getPetHistory);

module.exports = router;
