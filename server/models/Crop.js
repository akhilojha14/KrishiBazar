const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    image: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);