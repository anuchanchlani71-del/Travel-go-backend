const Company = require("../../models/trainsellermodel");
const User = require("../../models/usermodel"); // model name check kar lena
const Cab = require("../../models/Cabmodels");
const Bus = require("../../models/busModel");
const Train = require("../../models/Trainmodels");
const Flight = require("../../models/filghtmodel");
const Booking = require("../../models/Bookingmodel");

module.exports.superAdminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments();

    const totalSellers = await Company.countDocuments();

    const totalCabs = await Cab.countDocuments();

    const totalBuses = await Bus.countDocuments();

    const totalTrains = await Train.countDocuments();

    const totalFlights = await Flight.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const revenue = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount"
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      totalUsers,
      totalSellers,
      totalCabs,
      totalBuses,
      totalTrains,
      totalFlights,
      totalBookings,
      totalRevenue:
        revenue.length > 0 ? revenue[0].totalRevenue : 0
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};