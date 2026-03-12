const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User");
const Pet = require("./src/models/Pet");
const Vet = require("./src/models/Vet");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await User.deleteMany();
    await Pet.deleteMany();
    await Vet.deleteMany();

    // Create a demo user
    const user = await User.create({
      name: "Demo User",
      email: "demo@example.com",
      password: "password123",
      location: "New York, USA",
    });

    console.log("User created");

    // Create some vets
    const vets = await Vet.create([
      {
        name: "Dr. Sarah Wilson",
        specialty: "Pet Surgeon",
        rating: 4.8,
        distance: "1.2 km",
        address: "123 Pet St, NY",
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
        availability: ["Mon", "Wed", "Fri"],
        price: "$50",
      },
      {
        name: "Dr. Mike Ross",
        specialty: "General Veterinarian",
        rating: 4.5,
        distance: "2.5 km",
        address: "456 Animal Ave, NY",
        image:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
        availability: ["Tue", "Thu", "Sat"],
        price: "$40",
      },
    ]);

    console.log("Vets created");

    // Create some pets
    await Pet.create([
      {
        ownerId: user._id,
        name: "Bruno",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        weight: "25kg",
        gender: "Male",
        image:
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
      },
      {
        ownerId: user._id,
        name: "Luna",
        type: "Cat",
        breed: "Persian",
        age: 2,
        weight: "4kg",
        gender: "Female",
        image:
          "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
      },
    ]);

    console.log("Pets created");
    console.log("Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
