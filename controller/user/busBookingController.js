

const Booking = require("../../models/Bookingmodel");
const Bus = require("../../models/busModel");

module.exports.createBusBooking = async (req, res) => {
  try {
    const {
      userId,
      busId,
      journeyDate,
      boardingPoint,
      droppingPoint,
      passengersDetails,
    } = req.body;

    // Required fields check
    if (!userId || !busId || !journeyDate) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Passenger details check
    if (
      !Array.isArray(passengersDetails) ||
      passengersDetails.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Passengers details required",
      });
    }

    // Find bus
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found",
      });
    }

    const seatCount = passengersDetails.length;

    // Available seats check
    if (bus.availableSeats < seatCount) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // Requested seats
    const requestedSeats = passengersDetails.map(
      passenger => String(passenger.seatNumber).trim()
    );

    // Valid seat check
    const busSeats = bus.seatLayout.map(
      seat => String(seat.seatNumber).trim()
    );

    const invalidSeats = requestedSeats.filter(
      seat => !busSeats.includes(seat)
    );

    if (invalidSeats.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid seats: ${invalidSeats.join(", ")}`,
      });
    }

    // Already booked seat check
    const existingBookings = await Booking.find({
      busId,
      journeyDate,
      bookingStatus: {
        $in: ["confirmed", "pending"],
      },
    });

    const bookedSeats = existingBookings.flatMap(booking =>
      booking.passengersDetails.map(
        passenger => String(passenger.seatNumber).trim()
      )
    );

    const alreadyBooked = requestedSeats.filter(
      seat => bookedSeats.includes(seat)
    );

    if (alreadyBooked.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Already booked seats: ${alreadyBooked.join(", ")}`,
      });
    }

    // Amount calculation
    let totalAmount = 0;

    requestedSeats.forEach(seatNo => {
      const seatData = bus.seatLayout.find(
        seat => String(seat.seatNumber).trim() === seatNo
      );

      totalAmount += seatData?.price || bus.price;
    });

    totalAmount += bus.tax || 0;
    totalAmount -= bus.discount || 0;

    // Create booking
    const booking = await Booking.create({
      userId,
      bookingType: "bus",

      busId: bus._id,

      journeyDate,

      busName: bus.busName,
      busNumber: bus.busNumber,
      operatorName: bus.operatorName,
      busType: bus.busType,

      busDepartureTime: bus.departureTime,
      busArrivalTime: bus.arrivalTime,

      boardingPoint,
      droppingPoint,

      passengersDetails,

      amount: totalAmount,

      bookingStatus: "confirmed",
    });

    // Update available seats & mark seats as booked
    bus.seatLayout = bus.seatLayout.map(seat => {
      if (requestedSeats.includes(String(seat.seatNumber).trim())) {
        seat.isBooked = true;
      }
      return seat;
    });
    bus.availableSeats -= seatCount;
    await bus.save();

    return res.status(201).json({
      success: true,
      message: "Bus booked successfully",
      data: booking,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error while creating booking",
      error: error.message,
    });
  }
};