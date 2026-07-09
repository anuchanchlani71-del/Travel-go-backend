const mongoose = require("mongoose");

const cabSchema = new mongoose.Schema({

  // ===== BASIC CAB INFO =====
  cabName: { //vehiclename
    type: String,
    required: true
  },

  operator: {
    type: String,
    required: true
  },

  vehicleType: {
    type: String,
    enum: ["Mini", "Sedan", "SUV", "Luxury", "Auto", "Bike"],
    required: true
  },

  cabNumber: {
    type: String,
    required: true,
  },

  cabBrand: String,
  cabModel: String,
  cabColor: String,






  // ===== DRIVER INFO =====
  driverName: {
    type: String,
    required: true
  },

  driverPhone: {
    type: String,
    required: true
  },

  driverImage: String,

  driverExperience: Number,

  driverRating: {
    type: Number,
    default: 0
  },

  // ===== CAPACITY =====
  seatingCapacity: {
    type: Number,
    required: true
  },

  luggageCapacity: Number,

  // ===== PRICING =====
  baseFare: Number,
  pricePerKm: Number,
  pricePerMinute: Number,
  city: {
  type: String,
  required: true
},

  // ===== FEATURES =====
  airConditioned: {
    type: Boolean,
    default: true
  },

  wifiAvailable: {
    type: Boolean,
    default: false
  },

  musicAvailable: {
    type: Boolean,
    default: false
  },

  // ===== STATUS =====
  isActive: {
    type: Boolean,
    default: true
  },

  sellerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "CabCompany",
  required: true
},

  underMaintenance: {
    type: Boolean,
    default: false
  },

  // ===== VEHICLE =====
  vehicleModel: String,

  fuelType: {
    type: String,
    enum: ["Petrol", "Diesel", "CNG", "Electric"]
  },

  // ===== EXTRA =====
  rating: {
    type: Number,
    default: 0
  },

  cancellationPolicy: String,
  cabImage: String,
  notes: String

}, { timestamps: true });
  
module.exports = mongoose.model("Cab", cabSchema);