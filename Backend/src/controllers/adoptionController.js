const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");

// @desc    Create new adoption listing
// @route   POST /api/adoptions
// @access  Private
exports.createAdoption = async (req, res) => {
  try {
    const { petId, requirements, location, fee, description } = req.body;

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const adoption = await Adoption.create({
      pet: petId,
      owner: req.user._id,
      requirements,
      location,
      fee,
      description,
    });

    res.status(201).json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all adoption listings
// @route   GET /api/adoptions
// @access  Public
exports.getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ status: "available" })
      .populate("pet")
      .populate("owner", "name email avatar");
    res.json(adoptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for adoption
// @route   POST /api/adoptions/:id/apply
// @access  Private
exports.applyForAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ message: "Adoption listing not found" });
    }

    const application = {
      user: req.user._id,
      message: req.body.message,
    };

    adoption.applications.push(application);
    await adoption.save();

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update adoption status (Dashboard/Owner)
// @route   PUT /api/adoptions/:id
// @access  Private
exports.updateAdoptionStatus = async (req, res) => {
  try {
    const adoption = await Adoption.findById(req.params.id);
    if (!adoption) {
      return res.status(404).json({ message: "Adoption listing not found" });
    }

    adoption.status = req.body.status || adoption.status;
    await adoption.save();

    res.json(adoption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
