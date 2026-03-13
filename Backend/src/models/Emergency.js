const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      address: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "resolved", "cancelled"],
      default: "pending",
    },
    assignedVetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vet",
    },
    description: String,
    emergencyType: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emergency", emergencySchema);
