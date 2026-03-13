const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    vetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medication: {
      type: String,
    },
    notes: {
      type: String,
    },
    documentUrl: {
      type: String,
    },
    recordDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
