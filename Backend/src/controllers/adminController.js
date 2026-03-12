const Pet = require("../models/Pet");
const Vet = require("../models/Vet");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Adoption = require("../models/Adoption");
const LostPet = require("../models/LostPet");
const Post = require("../models/Post");

exports.getStats = async (req, res) => {
  try {
    const [
      totalPets,
      totalVets,
      totalAppointments,
      totalUsers,
      totalAdoptions,
      totalLostReports,
      totalPosts,
    ] = await Promise.all([
      Pet.countDocuments(),
      Vet.countDocuments(),
      Appointment.countDocuments(),
      User.countDocuments(),
      Adoption.countDocuments(),
      LostPet.countDocuments(),
      Post.countDocuments(),
    ]);

    res.json({
      totalPets,
      totalVets,
      totalAppointments,
      totalUsers,
      totalAdoptions,
      totalLostReports,
      totalPosts,
      activeUsers: Math.floor(totalUsers * 0.85), // Heuristic or real active query
      newReports: totalLostReports, // Recent reports count could be filtered by date
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
