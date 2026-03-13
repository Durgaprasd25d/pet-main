const Appointment = require("../models/Appointment");

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "vet") {
      query = { vetId: req.user._id };
    } else if (req.user.role === "admin") {
      query = {};
    } else {
      query = { userId: req.user._id };
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: "petId",
        select: "name type image ownerId",
        populate: {
          path: "ownerId",
          select: "name email",
        },
      })
      .populate("vetId", "name specialty clinicName avatar");
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
// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Role-based authorization
    if (
      req.user.role === "vet" &&
      appointment.vetId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this appointment" });
    }

    appointment.status = req.body.status || appointment.status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
