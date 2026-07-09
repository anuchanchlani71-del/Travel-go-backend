const Bookingmodel = require("../../models/Bookingmodel");
const trainBooking = require("../../models/Bookingmodel");
const Trainmodel = require("../../models/Trainmodels");




module.exports.createTrainBooking = async (req, res) => {
  try {
    const {
      userId,
      trainId,
      classType,
      passengersDetails,
      paymentMethod,
      from,
      to,
      tatkalBooking
    } = req.body;

    // Train check
    const train = await Trainmodel.findById(trainId);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found"
      });
    }

    // Find selected class
    const selectedClass = train.classes.find(
      cls => cls.classType === classType
    );

    if (!selectedClass) {
      return res.status(400).json({
        success: false,
        message: "Invalid class type"
      });
    }

    const passengerCount = passengersDetails.length;

    // Seat availability check
    if (selectedClass.availableSeats < passengerCount) {
      return res.status(400).json({
        success: false,
        message: `Only ${selectedClass.availableSeats} seats available`
      });
    }

    // Auto Seat Allocation
    const startSeat =
      selectedClass.totalSeats -
      selectedClass.availableSeats +
      1;

    const updatedPassengers = passengersDetails.map(
      (passenger, index) => ({
        ...passenger,
        seatNumber: `B1-${startSeat + index}`
      })
    );

    // Fare Calculation
    let amount =
      selectedClass.baseFare * passengerCount;

    // Tatkal Charges
    if (tatkalBooking) {
      amount += amount * 0.2;
    }

    // Generate PNR
    const pnrNumber =
      "PNR" + Date.now().toString().slice(-8);

    // Create Booking
    const booking = await Bookingmodel.create({
      userId,

      bookingType: "train",

      from: train.from,
      to: train.to,
      journeyDate: train.journeyDate,

      trainId: train._id,
      trainNumber: train.trainNumber,
      trainName: train.trainName,

      classType,

      passengersDetails: updatedPassengers,
from: train.fromStation?.stationName,
  to: train.toStation?.stationName,
      amount,

      paymentMethod,
      paymentStatus: "paid",

      bookingStatus: "confirmed",

      pnrNumber,

      tatkalBooking
    });

    // Reduce Seats
    selectedClass.availableSeats -= passengerCount;

    await train.save();

    return res.status(201).json({
      success: true,
      message: "Train booked successfully",
      data: booking
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports.getTrainBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Bookingmodel.find({
      userId,
      bookingType: "train"
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Train bookings fetched successfully",
      data: bookings
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};