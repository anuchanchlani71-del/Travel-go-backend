

const Bookingmodel = require("../../models/Bookingmodel");
const Trainmodels = require("../../models/Trainmodels");
const { StatusCodes } = require("http-status-codes");

module.exports.addTrain = async (req, res) => {

  try {

    const {
      trainNumber,
      trainName,
      fromStation,
      toStation,
      departureTime,
      arrivalTime,
      durationMinutes,
      journeyStartDate,
      journeyEndDate,
      runningDays,
      stops,
      trainType,
      operator,
      distance,
      pantryAvailable,
      tatkalAvailable,
      underMaintenance,
      isActive,
      sellerId,
      classes,
      cancellationPolicy
    } = req.body;

    // CHECK TRAIN EXISTS
    const trainEXIST = await Trainmodels.findOne({
      trainNumber
    });

    if (trainEXIST) {

      return res.json({
        success: false,
        message: "Train number already exists",
        status: StatusCodes.BAD_REQUEST
      });

    }

    // CREATE TRAIN
    const addTrain = await Trainmodels.create({

      trainNumber,
      trainName,
      fromStation,
      toStation,
      departureTime,
      arrivalTime,
      durationMinutes,
      journeyStartDate,
      journeyEndDate,
      runningDays,
      stops,
      trainType,
      operator,
      distance,
      pantryAvailable,
      tatkalAvailable,
      underMaintenance,
      isActive,
      sellerId,
      classes,
      cancellationPolicy

    });

    return res.json({

      success: true,
      status: StatusCodes.OK,
      message: "Train added successfully",
      data: addTrain

    });

  } catch (error) {

    console.log(error);

    return res.json({

      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message

    });

  }

};

  

// get train
module.exports.getTrain = async (req, res) => {
    try {
        const {sellerId}=req.query;
        const findTrain = await Trainmodels.find({sellerId:sellerId})
        if (!findTrain) {
            res.json({
                succcess: false,
                message: "Train not found",
                status: StatusCodes.BAD_REQUEST
            })
        }
        else {
            res.json({
                status: StatusCodes.OK,
                success: true,
                message: "train details",
                data: findTrain


            })
        }
    } catch (error) {
        console.log("error", error)
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "error found"
        })
    }
}


//GET API SINGLE
module.exports.findTrain = async (req, res) => {
    try {
        const { _id } = req.query
        const viewTrain = await Trainmodels.findOne({ _id })
        if (!viewTrain) {
            return res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "train not found"
            })

        } else {
            return res.json({
                status: StatusCodes.OK,
                success: true,
                messagge: "train found successfully",
                data: viewTrain,


            })
        }
    } catch (error) {
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        })
    }

}
//update


module.exports.editTrain = async (req, res) => {
    try {
        const Train_id = req.params.id;
      const { trainNumber, trainName,
            fromStation, toStation,
            departureTime, arrivalTime, durationMinutes,
            journeyStartDate, journeyEndDate,
            runningDays, stops,
            trainType, operator, distance, serviceType,
            pantryAvailable, tatkalAvailable, underMaintenance, isActive,
            classes,baseFare,
            cancellationPolicy
        } = req.body;



        const findTrain = await Trainmodels.findById(Train_id);

        if (!findTrain) {
            return res.json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: "train not found"
            });
        }

        // const updateData = {};
        // if (trainNumber !== undefined) updateData.trainNumber = trainNumber;
        // if (trainName !== undefined) updateData.trainName = trainName;
        // if (fromStation !== undefined) updateData.fromStation = fromStation;
        // if (toStation !== undefined) updateData.toStation = toStation;
        // if (departureTime !== undefined) updateData.departureTime = departureTime;
        // if (arrivalTime !== undefined) updateData.arrivalTime = arrivalTime;
        // if (duration !== undefined) updateData.duration = duration;
        // if (runningDays !== undefined) updateData.runningDays = runningDays;
        // if (classes !== undefined) updateData.classes = classes;





        const updateData = {};

        if (trainNumber !== undefined) updateData.trainNumber = trainNumber;
        if (trainName !== undefined) updateData.trainName = trainName;
        if (fromStation !== undefined) updateData.fromStation = fromStation;
        if (toStation !== undefined) updateData.toStation = toStation;
        if (departureTime !== undefined) updateData.departureTime = departureTime;
        if (arrivalTime !== undefined) updateData.arrivalTime = arrivalTime;
        if (durationMinutes !== undefined) updateData.durationMinutes = durationMinutes;
        if (journeyStartDate !== undefined) updateData.journeyStartDate = journeyStartDate;
        if (journeyEndDate !== undefined) updateData.journeyEndDate = journeyEndDate;
        if (runningDays !== undefined) updateData.runningDays = runningDays;
        if (stops !== undefined) updateData.stops = stops;
        if (trainType !== undefined) updateData.trainType = trainType;
        if (operator !== undefined) updateData.operator = operator;
        if (distance !== undefined) updateData.distance = distance;
        if (pantryAvailable !== undefined) updateData.pantryAvailable = pantryAvailable;
        if (tatkalAvailable !== undefined) updateData.tatkalAvailable = tatkalAvailable;
        if (underMaintenance !== undefined) updateData.underMaintenance = underMaintenance;
        if (classes !== undefined) updateData.classes = classes;
        if (baseFare !== undefined) updateData.baseFare = baseFare;
         if (serviceType !== serviceType) updateData.serviceType = serviceType;
        // if (status !== undefined) updateData.status = status;
        if (cancellationPolicy !== undefined) updateData.cancellationPolicy = cancellationPolicy;
        if (isActive !== undefined) updateData.isActive = isActive;

        const updateTrain = await Trainmodels.findByIdAndUpdate(Train_id, updateData, { new: true });

        if (updateTrain) {
            return res.json({
                success: true,
                status: StatusCodes.OK,
                message: "update train successfully",

            });
        }

    } catch (error) {
        return res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        });
    }
}


//Delete 

module.exports.deleteTrain = async (req, res) => {
    try {
        const Train_id = req.params.id
        const trainFind = await Trainmodels.findOne({ _id: Train_id })
        if (!trainFind) {
            res.json({
                status: StatusCodes.OK,
                success: false,
                message: " train not found"
            })
        }

        const trainDelete = await Trainmodels.deleteOne({ _id: Train_id })
        if (!trainDelete) {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "train not deleted "
            })
        }

        res.json({
            status: StatusCodes.OK,
            success: true,
            message: "train delete successfully"
        })

    } catch (error) {
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        })
    }

}

//search
exports.searchTrain = async (req, res) => {
    try {

        const { trainName, trainNumber } = req.query;

        let filter = {};


        if (trainName) {
            filter.trainName = { $regex: trainName, $options: "i" };
        }


        if (trainNumber) {
            filter.trainNumber = trainNumber
        }

        const Train = await Trainmodels.find(filter)
            .sort({ createdAt: -1 });


        res.json({
            success: true,
            data: Train
        });

    } catch (error) {
        console.log(error);
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        })
    }
};


//search route
// module.exports.searchroute = async (req, res) => {
//     try {
//         const { fromStation, toStation } = req.query;
//         if (!fromStation || !toStation) {
//             return res.json({
//                 success: false,
//                 message: "fromstation and tostation required"
//             });
//         }
//         const trains = await Trainmodels.find({
//             "fromStation.name": fromStation,
//             "toStation.name": toStation,
//             isActive: true

//         }).sort({ createdAt: -1 });


//         res.json({
//             success: true,
//             data: trains
//         })
//     } catch (error) {
//         console.log(error);
//         res.json({
//             status: 500,
//             success: false,
//             message: error.message
//         })
//     }
// }


// SEARCH TRAINS API

// module.exports.searchroute = async (req, res) => {

//   try {

//     // ================= GET QUERY =================
//     const { fromStation, toStation } = req.query;

//     // ================= VALIDATION =================
//     if (!fromStation || !toStation) {

//       return res.status(400).json({
//         success: false,
//         message: "fromStation and toStation are required"
//       });

//     }

//     // ================= FIND TRAINS =================
//     const trains = await Trainmodels.find({

//       "fromStation.stationName": {
//         $regex: fromStation,
//         $options: "i"
//       },

//       "toStation.stationName": {
//         $regex: toStation,
//         $options: "i"
//       },

//       isActive: true

//     }).sort({ createdAt: -1 });

//     // ================= RESPONSE =================
//     res.status(200).json({

//       success: true,

//       total: trains.length,

//       data: trains

//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// };
// module.exports.searchroute = async (req, res) => {
//   try {
//     const { fromStation, toStation, date } = req.query;

//     if (!fromStation || !toStation) {
//       return res.status(400).json({
//         success: false,
//         message: "fromStation and toStation are required"
//       });
//     }

//     const query = {
//       "fromStation.city": {
//         $regex: fromStation.trim(),
//         $options: "i"
//       },
//       "toStation.city": {
//         $regex: toStation.trim(),
//         $options: "i"
//       },
//       isActive: true
//     };

//     if (date) {
//       const selectedDate = new Date(date);

//       query.journeyStartDate = { $lte: selectedDate };
//       query.journeyEndDate = { $gte: selectedDate };
//     }

//     const trains = await Trainmodels.find(query).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       total: trains.length,
//       data: trains
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
//




//train seller booking admin


module.exports.getTrainSellerBookings = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required"
      });
    }

    const bookings = await Bookingmodel.find({
      bookingType: "train"
    })
      .populate({
        path: "trainId",
        match: {
          sellerId: sellerId
        }
      })
      .populate("userId");

    const filteredBookings = bookings.filter(
      booking => booking.trainId !== null
    );

    return res.status(200).json({
      success: true,
      data: filteredBookings
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};