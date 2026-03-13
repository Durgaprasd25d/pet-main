const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, createAppointment);

router.put("/:id/status", protect, updateAppointmentStatus);
router.put("/:id/cancel", protect, (req, res, next) => {
  req.body.status = "cancelled";
  updateAppointmentStatus(req, res, next);
});

module.exports = router;
