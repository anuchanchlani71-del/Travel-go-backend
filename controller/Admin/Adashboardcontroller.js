const Company = require("../../models/trainsellermodel");
const Cab = require("../../models/Cabmodels");
const Bus = require("../../models/busModel");
const Train = require("../../models/Trainmodels");
const Flight = require("../../models/filghtmodel");
const Booking = require("../../models/Bookingmodel");

module.exports.dashboard = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required",
      });
    }

    const seller = await Company.findById(sellerId);

    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // ================= CAB =================
    if (seller.businessType === "Cab") {
      const totalCab = await Cab.countDocuments({
        sellerId: sellerId,
      });

      const cabBookings = await Booking.find({
        bookingType: "cab",
      }).populate({
        path: "cabId",
        match: {
          sellerId: sellerId,
        },
      });

      const filteredBookings = cabBookings.filter(
        (booking) => booking.cabId !== null
      );

      const totalRevenue = filteredBookings.reduce(
        (sum, booking) => sum + (booking.amount || 0),
        0
      );

      return res.json({
        success: true,
        businessType: "Cab",
        totalVehicle: totalCab,
        totalBookings: filteredBookings.length,
        totalRevenue,
      });
    }

    // ================= BUS =================
    if (seller.businessType === "Bus") {
      const totalBus = await Bus.countDocuments({
        operatorId: sellerId,
      });

      const busBookings = await Booking.find({
        bookingType: "bus",
      }).populate({
        path: "busId",
        match: {
          operatorId: sellerId,
        },
      });

      const filteredBookings = busBookings.filter(
        (booking) => booking.busId !== null
      );

      const totalRevenue = filteredBookings.reduce(
        (sum, booking) => sum + (booking.amount || 0),
        0
      );

      return res.json({
        success: true,
        businessType: "Bus",
        totalVehicle: totalBus,
        totalBookings: filteredBookings.length,
        totalRevenue,
      });
    }

    // ================= TRAIN =================
    if (seller.businessType === "Train") {
      const totalTrain = await Train.countDocuments({
        sellerId: sellerId,
      });

      const trainBookings = await Booking.find({
        bookingType: "train",
      }).populate({
        path: "trainId",
        match: {
          sellerId: sellerId,
        },
      });

      const filteredBookings = trainBookings.filter(
        (booking) => booking.trainId !== null
      );

      const totalRevenue = filteredBookings.reduce(
        (sum, booking) => sum + (booking.amount || 0),
        0
      );

      return res.json({
        success: true,
        businessType: "Train",
        totalVehicle: totalTrain,
        totalBookings: filteredBookings.length,
        totalRevenue,
      });
    }

    // ================= FLIGHT =================
    if (seller.businessType === "Flight") {
      const totalFlight = await Flight.countDocuments({
        createdBy: sellerId,
      });

      const flightBookings = await Booking.find({
        bookingType: "flight",
      }).populate({
        path: "flightId",
        match: {
          createdBy: sellerId,
        },
      });

      const filteredBookings = flightBookings.filter(
        (booking) => booking.flightId !== null
      );

      const totalRevenue = filteredBookings.reduce(
        (sum, booking) => sum + (booking.amount || 0),
        0
      );

      return res.json({
        success: true,
        businessType: "Flight",
        totalVehicle: totalFlight,
        totalBookings: filteredBookings.length,
        totalRevenue,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid business type",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};