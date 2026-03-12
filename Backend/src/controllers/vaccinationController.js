const Vaccination = require("../models/Vaccination");

// @desc    Get pet vaccinations
// @route   GET /api/vaccinations/pet/:petId
// @access  Private
exports.getVaccinationsByPet = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.petId });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add vaccination record
// @route   POST /api/vaccinations
// @access  Private
exports.addVaccination = async (req, res) => {
  const { petId, vaccineType, dateAdministered, nextDueDate, vetName, notes } =
    req.body;

  try {
    const vaccination = new Vaccination({
      petId,
      vaccineType,
      dateAdministered,
      nextDueDate,
      vetName,
      notes,
    });

    const createdVaccination = await vaccination.save();
    res.status(201).json(createdVaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
