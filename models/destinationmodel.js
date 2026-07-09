const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
    price: String,
    image: String, // filename
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);