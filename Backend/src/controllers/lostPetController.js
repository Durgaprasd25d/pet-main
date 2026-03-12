const LostPet = require("../models/LostPet");

// @desc    Report lost/found pet
// @route   POST /api/lostpets
// @access  Private
exports.reportLostPet = async (req, res) => {
  try {
    const {
      type,
      petName,
      breed,
      color,
      lastSeenLocation,
      lastSeenDate,
      description,
      image,
      contactInfo,
    } = req.body;

    const lostPet = await LostPet.create({
      type,
      petName,
      breed,
      color,
      lastSeenLocation,
      lastSeenDate,
      description,
      image,
      reportedBy: req.user._id,
      contactInfo,
    });

    res.status(201).json(lostPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all lost/found pets
// @route   GET /api/lostpets
// @access  Public
exports.getLostPets = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { status: "active" };
    if (type) filter.type = type;

    const lostPets = await LostPet.find(filter)
      .populate("reportedBy", "name email avatar")
      .sort({ lastSeenDate: -1 });

    res.json(lostPets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single lost pet details
// @route   GET /api/lostpets/:id
// @access  Public
exports.getLostPetById = async (req, res) => {
  try {
    const lostPet = await LostPet.findById(req.params.id).populate(
      "reportedBy",
      "name avatar",
    );
    if (!lostPet) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.json(lostPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lost pet status
// @route   PUT /api/lostpets/:id
// @access  Private
exports.updateLostPetStatus = async (req, res) => {
  try {
    const lostPet = await LostPet.findById(req.params.id);
    if (!lostPet) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (
      lostPet.reportedBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    lostPet.status = req.body.status || lostPet.status;
    await lostPet.save();

    res.json(lostPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
