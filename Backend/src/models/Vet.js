const mongoose = require("mongoose");

const vetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: String,
    rating: Number,
    distance: String,
    address: String,
    image: String,
    availability: [String],
    price: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Vet", vetSchema);
