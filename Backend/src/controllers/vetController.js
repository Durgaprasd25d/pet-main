const User = require("../models/User");

// @desc    Get all vets
// @route   GET /api/vets
// @access  Public
exports.getVets = async (req, res) => {
  try {
    const vets = await User.find({ role: "vet" }).select("-password");
    // Map User to Vet format if necessary (though fields mostly match now)
    const formattedVets = vets.map((vet) => ({
      _id: vet._id,
      name: vet.name,
      specialty: vet.specialty,
      rating: vet.rating,
      reviews: vet.reviews,
      image:
        vet.avatar ||
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      clinicName: vet.clinicName,
      distance: "2.5 km", // Default/Mock distance
      about: vet.about,
      address: vet.address,
      phone: vet.phone,
    }));
    res.json(formattedVets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vet by ID
// @route   GET /api/vets/:id
// @access  Public
exports.getVetById = async (req, res) => {
  try {
    const vet = await User.findOne({ _id: req.params.id, role: "vet" }).select(
      "-password",
    );
    if (vet) {
      const formattedVet = {
        _id: vet._id,
        name: vet.name,
        specialty: vet.specialty,
        rating: vet.rating,
        reviews: vet.reviews,
        image:
          vet.avatar ||
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
        clinicName: vet.clinicName,
        distance: "2.5 km",
        about: vet.about,
        address: vet.address,
        phone: vet.phone,
      };
      res.json(formattedVet);
    } else {
      res.status(404).json({ message: "Vet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
