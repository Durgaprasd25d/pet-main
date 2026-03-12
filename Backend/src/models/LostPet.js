const mongoose = require("mongoose");

const lostPetSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["lost", "found"],
      required: true,
    },
    petName: {
      type: String, // Mandatory for lost, optional for found
      required: function () {
        return this.type === "lost";
      },
    },
    breed: String,
    color: String,
    lastSeenLocation: {
      type: String,
      required: true,
    },
    lastSeenDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
    },
    contactInfo: {
      phone: String,
      email: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LostPet", lostPetSchema);
