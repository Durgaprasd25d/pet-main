const Prescription = require("../models/Prescription");
const Pet = require("../models/Pet");

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Private
exports.getPrescriptions = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "admin") {
      query = {};
    } else if (req.user.role === "vet") {
      query = { vetId: req.user._id };
    } else {
      // Find prescriptions for pets owned by this user
      const pets = await Pet.find({ ownerId: req.user._id }).distinct("_id");
      query = { petId: { $in: pets } };
    }

    // Allow filtering by specific petId if provided
    if (req.query.petId) {
      query.petId = req.query.petId;
    }

    const prescriptions = await Prescription.find(query)
      .populate("petId", "name type breed")
      .populate("vetId", "name specialty clinicName")
      .sort("-date");
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private/Vet
exports.createPrescription = async (req, res) => {
  const { petId, medicines, instructions, appointmentId } = req.body;

  try {
    const prescription = new Prescription({
      petId,
      vetId: req.user._id,
      appointmentId,
      medicines,
      instructions,
    });

    const createdPrescription = await prescription.save();
    res.status(201).json(createdPrescription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Private
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("petId", "name type breed")
      .populate("vetId", "name specialty clinicName");

    if (prescription) {
      res.json(prescription);
    } else {
      res.status(404).json({ message: "Prescription not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private/Vet/Admin
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (prescription) {
      // Vet can only delete their own
      if (
        req.user.role === "vet" &&
        prescription.vetId.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: "Not authorized" });
      }
      await Prescription.findByIdAndDelete(req.params.id);
      res.json({ message: "Prescription removed" });
    } else {
      res.status(404).json({ message: "Prescription not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
