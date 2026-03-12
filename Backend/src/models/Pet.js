const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Bird", "Rabbit", "Other"],
    },
    breed: String,
    age: Number,
    weight: String,
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    image: String,
    medicalHistory: [
      {
        date: Date,
        title: String,
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pet", petSchema);
