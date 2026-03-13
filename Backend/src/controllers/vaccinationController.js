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

// @desc    Delete vaccination record
// @route   DELETE /api/vaccinations/:id
// @access  Private
exports.deleteVaccination = async (req, res) => {
  try {
    const vaccination = await Vaccination.findById(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ message: "Vaccination record not found" });
    }
    await Vaccination.findByIdAndDelete(req.params.id);
    res.json({ message: "Vaccination record removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get upcoming vaccinations for all user's pets
// @route   GET /api/vaccinations/upcoming
// @access  Private
exports.getUpcomingVaccinations = async (req, res) => {
  try {
    const Pet = require("../models/Pet");
    const userPets = await Pet.find({ ownerId: req.user._id }).distinct("_id");

    const upcoming = await Vaccination.find({
      petId: { $in: userPets },
      nextDueDate: { $gt: new Date() },
    })
      .populate("petId", "name type breed image")
      .sort({ nextDueDate: 1 });

    res.json(upcoming);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
