const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  // ================= USER =================
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Travelgouser"
  },

  // ================= TYPE =================
  bookingType: {
    type: String,
    enum: ["cab", "train", "bus", "flight"],
    required: true
  },

  // ================= JOURNEY =================
  from: String,
  to: String,
  journeyDate: Date,

  // ================= PASSENGERS =================
//   passengers: Number,

passengersDetails: {
  type: [
    {
      name: String,
      age: Number,
      gender: String,
      seatNumber: String
    }
  ],
  default: undefined
},

  // ================= PAYMENT =================
  amount: Number,

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },

  paymentMethod: {
    type: String,
    enum: ["upi", "card", "cash"]
  },

  // ================= STATUS =================
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },

  // ===================================================
  // ================= CAB =============================
  // ===================================================
  cabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cab"
  },

  pickupLocation: String,
  dropLocation: String,

  driverName: String,
  vehicleType: String,
  vehicleNumber: String,
   cabName:String,
  distanceKm: Number,
  pricePerKm: Number,

  // ===================================================
  // ================= TRAIN ===========================
  // ===================================================
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train"
  },

  trainNumber: String,
  trainName: String,

  classType: {
    type: String,
    enum: ["SL", "3AC", "2AC", "1AC", "CC", "2S"]
  },

  coachNumber: String,

// seatNumbers: {
//   type: [String],
//   default: undefined
// },

  pnrNumber: String,

  tatkalBooking: Boolean,

    // ===================================================
  // ================= BUS =============================
  // ===================================================
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Busdata"
  },

  busName: String,

  busNumber: String,

  operatorName: String,

  busType: {
    type: String,
    enum: [
      "AC Sleeper",
      "Non-AC Sleeper",
      "AC Seater",
      "Non-AC Seater",
      "Volvo",
      "Semi Sleeper"
    ]
  },
busDepartureTime: Date,
busArrivalTime: Date,
  boardingPoint: String,

  droppingPoint: String,

  // ===================================================
  // ================= FLIGHT ==========================
  // ===================================================
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flightmodel"
  },

  flightNumber: String,

  airline: String,

  airlineCode: String,

  fromAirport: String,

  toAirport: String,

flightDepartureTime: Date,
flightArrivalTime: Date,

  duration: Number,

  travelClass: {
    type: String,
    enum: ["economy", "business"]
  },

  aircraftName: String,

  aircraftCode: String,

  baggageCheckIn: String,

  baggageCabin: String,


  // ================= EXTRA =================
  cancellationReason: String,

  refunded: Boolean

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);