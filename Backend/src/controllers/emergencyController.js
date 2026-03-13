const Emergency = require("../models/Emergency");

// @desc    Create a new emergency (SOS)
// @route   POST /api/emergency
// @access  Private
exports.createEmergency = async (req, res) => {
  try {
    const { latitude, longitude, address, petId, description, emergencyType } = req.body;

    const emergency = await Emergency.create({
      userId: req.user._id,
      petId,
      location: { latitude, longitude, address },
      description,
      emergencyType,
    });

    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active emergencies (for Vets/Admin)
// @route   GET /api/emergency
// @access  Private
exports.getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("userId", "name phone")
      .populate("petId", "name type breed")
      .sort("-createdAt");
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update emergency status (Accept/Resolve)
// @route   PUT /api/emergency/:id
// @access  Private
exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { status, vetId } = req.body;
    const emergency = await Emergency.findById(req.params.id);

    if (emergency) {
      emergency.status = status || emergency.status;
      if (vetId) emergency.assignedVetId = vetId;
      
      const updatedEmergency = await emergency.save();
      res.json(updatedEmergency);
    } else {
      res.status(404).json({ message: "Emergency request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
