
const { get } = require("mongoose");

const Trainmodels = require("../../models/Trainmodels");



module.exports.frontViewTrain = async (req, res) => {

  try {

    const trains = await Trainmodels.find({
      isActive: true
    })
    .sort({ createdAt: -1 });

    if (trains.length === 0) {

      return res.json({
        success: false,
        status: 400,
        message: "Train not found"
      });

    }

    const trainData = trains.map((train) => {

      return {

        _id: train._id,

        // ===== BASIC =====
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        operator: train.operator,
        trainType: train.trainType,

        // ===== STATIONS =====
        fromStation: {
          stationName:
            train.fromStation?.stationName,

          stationCode:
            train.fromStation?.stationCode
        },

        toStation: {
          stationName:
            train.toStation?.stationName,

          stationCode:
            train.toStation?.stationCode
        },

        // ===== TIMINGS =====
        departureTime:
          train.departureTime,

        arrivalTime:
          train.arrivalTime,

        durationMinutes:
          train.durationMinutes,

        journeyStartDate:
          train.journeyStartDate,

        journeyEndDate:
          train.journeyEndDate,

        // ===== RUNNING DAYS =====
        runningDays:
          train.runningDays,

        // ===== STOPS =====
        stops:
          train.stops,

        // ===== FEATURES =====
        pantryAvailable:
          train.pantryAvailable,

        tatkalAvailable:
          train.tatkalAvailable,

        underMaintenance:
          train.underMaintenance,

        isActive:
          train.isActive,

        // ===== CLASSES =====
        classes:
          train.classes,

        // ===== POLICY =====
        cancellationPolicy:
          train.cancellationPolicy,

        // ===== SELLER =====
        sellerId:
          train.sellerId,

        // ===== CREATED =====
        createdAt:
          train.createdAt

      };

    });

    return res.json({

      success: true,
      status: 200,

      message:
        "All trains fetched successfully",

      data: trainData

    });

  } catch (error) {

    console.log(error);

    return res.json({

      success: false,
      status: 500,

      message:
        error.message

    });

  }

};

//search route
module.exports.searchroute = async (req, res) => {
  try {
    const { fromStation, toStation, date } = req.query;

    if (!fromStation || !toStation) {
      return res.status(400).json({
        success: false,
        message: "fromStation and toStation are required"
      });
    }

   const query = {

  "fromStation.city": {

    $regex: `^${fromStation.trim()}$`,

    $options: "i"

  },

  "toStation.city": {

    $regex: `^${toStation.trim()}$`,

    $options: "i"

  },

  isActive: true

};

    if (date) {
      const selectedDate = new Date(date);

      query.journeyStartDate = { $lte: selectedDate };
      query.journeyEndDate = { $gte: selectedDate };
    }

    const trains = await Trainmodels.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: trains.length,
      data: trains
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//front single train
exports.singleTrain = async (req, res) => {
  try {
    const { id } = req.query;

    const train = await Trainmodels.findById(id);

    if (!train) {
      return res.status(404).json({
        success: false,
        message: "Train not found"
      });
    }

    res.json({
      success: true,
      data: train
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};