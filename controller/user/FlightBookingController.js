const Booking = require("../../models/Bookingmodel");
const Flight = require("../../models/filghtmodel");
const { default: mongoose } = require("mongoose");

// ================= CREATE FLIGHT BOOKING =================
module.exports.createFlightBooking = async (req, res) => {
  try {
   const {
  userId,
  flightId,
  fromAirport,
  toAirport,
  travelClass,
  journeyDate,
  passengersDetails
} = req.body;

   

    // ================= FIND FLIGHT =================
    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.json({
        success: false,
        message: "Flight not found"
      });
    }

    // ================= CLASS SELECTION =================
    const classData = flight.classes?.[travelClass];

    if (!classData) {
      return res.json({
        success: false,
        message: "Invalid travel class"
      });
    }

    const seatCount = passengersDetails?.length || 0;

    // ================= SEAT CHECK =================
    if (classData.availableSeats < seatCount) {
      return res.json({
        success: false,
        message: "Not enough seats available"
      });
    }

    // ================= PRICE CALCULATION =================
    const amount = classData.price * seatCount;

    // ================= UPDATE SEATS =================
    classData.availableSeats -= seatCount;
    await flight.save();

    // ================= CREATE BOOKING =================
 const booking = await Booking.create({
  userId,
  bookingType: "flight",
  flightId: flight._id,

  journeyDate,

  flightNumber: flight.flightnumber,
  airline: flight.airline,
  airlineCode: flight.airlineCode,

  fromAirport,
  toAirport,
  travelClass,

  flightDepartureTime: flight.departuretime,
  flightArrivalTime: flight.arrivaltime,

  passengersDetails,
  amount,

  bookingStatus: "confirmed"
});

    return res.json({
      success: true,
      message: "Flight booked successfully",
      data: booking
    });

  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in flight booking"
    });
  }
};

// ================= GET MY FLIGHT BOOKINGS =================
module.exports.getMyFlightBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId"
      });
    }

    const bookings = await Booking.find({
      userId,
      bookingType: "flight"
    })
      .populate("flightId", "flightnumber airline from to")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching flight bookings"
    });
  }
};