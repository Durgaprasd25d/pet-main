const Pet = require("../models/Pet");

// @desc    Get all pets
// @route   GET /api/pets
// @access  Private
exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find({ ownerId: req.user._id });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pet by ID
// @route   GET /api/pets/:id
// @access  Private
exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (pet && pet.ownerId.toString() === req.user._id.toString()) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new pet
// @route   POST /api/pets
// @access  Private
exports.createPet = async (req, res) => {
  const { name, type, breed, age, weight, gender, image } = req.body;

  try {
    const pet = new Pet({
      ownerId: req.user._id,
      name,
      type,
      breed,
      age,
      weight,
      gender,
      image,
    });

    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Private
exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet && pet.ownerId.toString() === req.user._id.toString()) {
      pet.name = req.body.name ?? pet.name;
      pet.type = req.body.type ?? pet.type;
      pet.breed = req.body.breed ?? pet.breed;
      pet.age = req.body.age ?? pet.age;
      pet.weight = req.body.weight ?? pet.weight;
      pet.gender = req.body.gender ?? pet.gender;
      pet.image = req.body.image ?? pet.image;

      const updatedPet = await pet.save();
      res.json(updatedPet);
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a pet
// @route   DELETE /api/pets/:id
// @access  Private
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (pet && pet.ownerId.toString() === req.user._id.toString()) {
      await Pet.findByIdAndDelete(req.params.id);
      res.json({ message: "Pet removed" });
    } else {
      res.status(404).json({ message: "Pet not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
