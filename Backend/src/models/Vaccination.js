const mongoose = require("mongoose");

const vaccinationSchema = new mongoose.Schema(
  {
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    vaccineType: {
      type: String,
      required: true,
    },
    dateAdministered: Date,
    nextDueDate: Date,
    vetName: String,
    notes: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
