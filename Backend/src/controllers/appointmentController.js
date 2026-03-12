const Appointment = require("../models/Appointment");

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate("petId", "name type")
      .populate("vetId", "name specialty");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  const { petId, vetId, date, time, reason } = req.body;

  try {
    const appointment = new Appointment({
      userId: req.user._id,
      petId,
      vetId,
      date,
      time,
      reason,
    });

    const createdAppointment = await appointment.save();
    res.status(201).json(createdAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
