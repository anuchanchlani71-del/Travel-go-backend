const statuscode = require("http-status-codes")
const busModel = require("../../models/busModel");
const { default: mongoose } = require("mongoose");
const Bookingmodel = require("../../models/Bookingmodel");

module.exports.registerBus = async (req, res) => {
  console.log("--- registerBus Hit ---");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  if (!req.body) {
    console.error("ERROR: req.body is undefined!");
    return res.status(400).json({
      status: 400,
      success: false,
      message: `Request body is undefined. Content-Type: ${req.headers['content-type']}. Please refresh your browser or check the frontend request.`
    });
  }

  try {

    const {
      busName,
      busNumber,
      operatorName,
      operatorId,
      busType,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      stops,
      droppingPoints,
      totalSeats,
      availableSeats,
      seatLayout,
      price,
      tax,
      discount,
      amenities,
      cancellationPolicy,
      status,
      createdBy
    } = req.body

    // ================= IMAGES FIX =================
    const images = req.files ? req.files.map(file => file.filename) : []

    //=====================bus data check in database============
    const findBusData = await busModel.findOne({ busNumber })

    if (findBusData) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Bus Data Already Register"
      })
    }

    const busData = await busModel.create({
      busName,
      busNumber,
      operatorName,
      operatorId,
      busType,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      stops,
      droppingPoints,
      totalSeats,
      availableSeats,
      seatLayout,
      price,
      tax,
      discount,
      amenities,
      images,   // ✅ FIXED
      cancellationPolicy,
      status,
      createdBy
    })

    return res.json({
      status: statuscode.OK,
      success: true,
      message: "Bus Data register Successfully",
      data: busData
    })

  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })
  }
}
// module.exports.busDataUpdate = async (req, res) => {
//     try {
//         const id = req.params.id

//         if (!id) {
//             return res.json({
//                 status: statuscode.BAD_REQUEST,
//                 success: false,
//                 message: "Id is required"
//             })
//         };
//         const { busName, busNumber, operatorName, operatorId, busType, from,
//             to, departureTime, arrivalTime, duration, stops, droppingPoints, totalSeats,
//             availableSeats, seatLayout, price, tax, discount, amenities, cancellationPolicy,
//             status, 
//         } = req.body


//         const busDataFind = await busModel.findById(id)
//         if (!busDataFind) {
//             return res.json({
//                 status: statuscode.BAD_REQUEST,
//                 success: false,
//                 message: "bus Data not Found in Database"
//             })
//         }
//         const updateData = {
//             busName, busNumber, operatorName, operatorId, busType, from,
//             to, departureTime, arrivalTime, duration, stops, droppingPoints, totalSeats,
//             availableSeats, seatLayout, price, tax, discount, amenities, cancellationPolicy,
//             status,
//         }
//         const updateBusData = await busModel.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         )
//         return res.json({
//             status: statuscode.OK,
//             success: true,
//             message: "Bus Data Update Successfully "
//         })

//     } catch (error) {
//   return res.json({
//     status:statuscode.INTERNAL_SERVER_ERROR,
//     success:false,
//     message:error.message
//   })
//     }
// }


module.exports.busDataUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Id is required"
      });
    }

    const {
      busName,
      busNumber,
      operatorName,
      operatorId,
      busType,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      stops,
      boardingPoints,
      droppingPoints,
      totalSeats,
      availableSeats,
      seatLayout,
      price,
      tax,
      discount,
      amenities,
      cancellationPolicy,
      status
    } = req.body;

    const busDataFind = await busModel.findById(id);

    if (!busDataFind) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Bus Data not Found in Database"
      });
    }

    const updateData = {
      busName,
      busNumber,
      operatorName,
      operatorId,
      busType,
      from,
      to,
      departureTime,
      arrivalTime,
      duration,
      stops,
      boardingPoints,
      droppingPoints,
      totalSeats,
      availableSeats,
      seatLayout,
      price,
      tax,
      discount,
      amenities,
      cancellationPolicy,
      status
    };

    // Image Update
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.path);
    }

    const updateBusData = await busModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.json({
      status: statuscode.OK,
      success: true,
      message: "Bus Data Updated Successfully",
      data: updateBusData
    });

  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
module.exports.deleteBusData = async (req, res) => {
  try {
    const bus_id = req.params.id
    if (!bus_id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Id is required"
      })
    }

    const findBusData = await busModel.deleteOne({ _id: bus_id })
    return res.json({
      status: statuscode.OK,
      success: true,
      message: "delete Bus Data successfully"
    })
  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })
  }
}


module.exports.ViewOneBusData = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Id is required"
      })

    }


    const findBusData = await busModel.findById({ _id: id })
    if (!findBusData) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Bus Data Not Found"
      })

    } else {
      return res.json({
        status: statuscode.OK,
        success: true,
        message: "Bus Data Find Successfully",
        data: findBusData

      })

    }
  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })
  }
}

module.exports.ViewAllBusData = async (req, res) => {
  try {
    const seller_id = req.params.id

    const viewBusData = await busModel.find({ operatorId: seller_id })
    if (!viewBusData) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Not Found Bus Data"
      })

    } else {
      return res.json({
        status: statuscode.OK,
        success: true,
        message: "Bus Data Found Successfully",
        data: viewBusData
      })
    }
  } catch (error) {
    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })

  }

}

// module.exports. searchBus = async (req, res) => {

//   try {

//     const { sellerId } = req.params;
//     const { busNumber } = req.query;

//     const data = await busModel.find({
//         createdBy: new mongoose.Types.ObjectId(sellerId),
//       busNumber: {
//         $regex: busNumber,
//         $options: "i"
//       }
//     });

//     res.json({
//       success: true,
//       data
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// };

module.exports.searchBus = async (req, res) => {

  try {

    const { seller_id } = req.params;
    console.log(req.params.seller_id);
    const { busNumber } = req.query;

    const data = await busModel.find({

      operatorId: seller_id,

      busNumber: {
        $regex: busNumber,
        $options: "i"
      }

    });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// bus seller booking 
module.exports.getBusSellerBookings = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required"
      });
    }

    const bookings = await Bookingmodel.find({
      bookingType: "bus"
    })
      .populate({
        path: "busId",
        match: {
          operatorId: sellerId
        }
      })
      .populate("userId");

    const filteredBookings = bookings.filter(
      booking => booking.busId !== null
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