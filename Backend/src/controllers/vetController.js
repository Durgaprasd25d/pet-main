const Vet = require("../models/Vet");

// @desc    Get all vets
// @route   GET /api/vets
// @access  Public
exports.getVets = async (req, res) => {
  try {
    const vets = await Vet.find({});
    res.json(vets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vet by ID
// @route   GET /api/vets/:id
// @access  Public
exports.getVetById = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (vet) {
      res.json(vet);
    } else {
      res.status(404).json({ message: "Vet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
