const Cab = require("../../models/Cabmodels");
const Booking = require("../../models/Bookingmodel");
const { default: mongoose } = require("mongoose");


module.exports.createCabBooking = async (req, res) => {
  try {
    const {
      userId,
      cabId,
      pickupLocation,
      dropLocation,
      paymentMethod
    } = req.body;

    
   
    // Find Cab
    const cab = await Cab.findById(cabId);

    if (!cab) {
      return res.json({
        success: false,
        message: "Cab not found"
      });
    }

   
const distance = 10;
const amount = cab.baseFare + (cab.pricePerKm * distance);
    // Create Booking
    const booking = await Booking.create({
      userId,
      bookingType: "cab",
      cabId: cab._id,

      pickupLocation,
      dropLocation,

      driverName: cab.driverName,
      vehicleType: cab.vehicleType,
      vehicleNumber: cab.cabNumber,
      cabName:cab.cabName,

      distanceKm: distance,
      pricePerKm: cab.pricePerKm,
      amount,

      paymentMethod,

      paymentStatus: "pending",
      bookingStatus: "confirmed"
    });

    return res.json({
      success: true,
      message: "Cab booked successfully",
      data: booking
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Error in cab booking"
    });
  }
};



module.exports.getMyBookings = async (req, res) => {
  try {

    const { userId } = req.params;

    const SITEURL =
      `${process.env.SITEURL}/uploads/cabs/`;

    const bookings = await Booking.find({ userId })
      .populate("cabId", "cabImage")
      .sort({ createdAt: -1 });

    const bookingData = bookings.map((booking) => {

      const data = booking.toObject();

      if (data.cabId?.cabImage) {
        data.cabId.cabImage =
          SITEURL + data.cabId.cabImage;
      }

      return data;
    });

    return res.status(200).json({
      success: true,
      data: bookingData
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};