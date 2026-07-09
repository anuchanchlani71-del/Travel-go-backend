const { get } = require("mongoose");
const Cabmodels = require("../../models/Cabmodels");

const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes");
const Bookingmodel = require("../../models/Bookingmodel");

module.exports.addCab = async (req, res) => {

    try {

        console.log("BODY =>", req.body);

        const {

            cabNumber,
            cabName,
            operator,
            vehicleType,
            city,

            cabBrand,
            cabModel,
            cabColor,

            seatingCapacity,
            luggageCapacity,

            baseFare,
            pricePerKm,
            pricePerMinute,

            airConditioned,
            wifiAvailable,
            musicAvailable,

            driverName,
            driverPhone,
            driverExperience,
            driverRating,

            isActive,
            sellerId,
            underMaintenance,

            fuelType,
            rating,
            cancellationPolicy,
            notes

        } = req.body;

        // ===== CHECK EXIST =====

        const cabEXIST = await Cabmodels.findOne({ cabNumber });

        if (cabEXIST) {

            return res.json({
                success: false,
                message: "Cab number already exists"
            });

        }

        // ===== IMAGES =====

        const driverImage =
            req.files?.driverImage?.[0]?.filename || "";

        const cabImage =
            req.files?.cabImage?.[0]?.filename || "";

        // ===== DATA =====

        const CabData = {

            cabNumber,
            cabName,
            operator,
            vehicleType,
            city,
            cabBrand,
            cabModel,
            cabColor,

            seatingCapacity,
            luggageCapacity,

            baseFare,
            pricePerKm,
            pricePerMinute,

            airConditioned,
            wifiAvailable,
            musicAvailable,

            driverName,
            driverPhone,

            driverImage,
            cabImage,

            driverExperience,
            driverRating,

            isActive,
            sellerId,
            underMaintenance,

            fuelType,

            rating,
            cancellationPolicy,
            notes

        };

        console.log("CAB DATA =>", CabData);

        const addCab = await Cabmodels.create(CabData);

        return res.json({

            success: true,
            message: "Cab added successfully",
            data: addCab

        });

    } catch (error) {

        console.log("ADD CAB ERROR =>", error);

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


//delete
module.exports.deleteCab = async (req, res) => {
    try {
        const Cab_id = req.params.id
        const cabFind = await Cabmodels.findOne({ _id: Cab_id })
        if (!cabFind) {
            res.json({
                status: StatusCodes.OK,
                success: false,
                message: " cab not found"
            })
        }

        const cabDelete = await Cabmodels.deleteOne({ _id: Cab_id })
        if (!cabDelete) {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "cab not deleted "
            })
        }

        res.json({
            status: StatusCodes.OK,
            success: true,
            message: "cab delete successfully"
        })

    } catch (error) {
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        })
    }

}

//get cab
module.exports.getCab = async (req, res) => {
    try {
        const { sellerId } = req.query;
        const getCab = await Cabmodels.find({ sellerId: sellerId })
        if (!getCab) {
            res.json({
                success: false,
                message: "cab not found",
                Status: StatusCodes.BAD_REQUEST
            })
        }
        else {
            res.json({
                success: true,
                message: "cab found successfully",
                status: StatusCodes.OK,
                data: getCab
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


//get cab single
// module.exports.getOnecab = async (req, res) => {
//     try {
//         const { _id } = req.query
//         const getOnecab = await Cabmodels.findOne({ _id })
//         if (!getOnecab) {
//             res.json({
//                 success: false,
//                 message: "cab not found",
//                 Status: StatusCodes.BAD_REQUEST
//             })
//         } else {
//             return res.json({
//                 success: true,
//                 message: "cab found successfully",
//                 status: StatusCodes.OK,
//                 data: getOnecab
//             })
//         }
//     } catch (error) {
//         res.json({
//             success: false,
//             message: "error found",
//             status: INTERNAL_SERVER_ERROR
//         })
//     }
// }


module.exports.getOnecab = async (req, res) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res.json({
        success: false,
        status: 400,
        message: "_id is required"
      });
    }

    const cab = await Cabmodels.findOne({ _id });

    if (!cab) {
      return res.json({
        success: false,
        status: 400,
        message: "cab not found"
      });
    }

    const SITEURL = `${process.env.SITEURL}/uploads/cabs/`;

    const cabData = {
      ...cab._doc,

      cabImage: cab.cabImage
        ? SITEURL + cab.cabImage
        : "",

      driverImage: cab.driverImage
        ? SITEURL + cab.driverImage
        : ""
    };

    return res.json({
      success: true,
      status: 200,
      message: "cab found successfully",
      data: cabData
    });

  } catch (error) {
    return res.json({
      success: false,
      status: 500,
      message: error.message
    });
  }
};
//      search api
module.exports.searchCab = async (req, res) => {
    try {
        const { cabNumber, cabName } = req.query;


        let filter = {};
        if (cabName) {
            filter.cabName = { $regex: cabName, $options: "i" };
        }


        if (cabNumber) {
            filter.cabNumber = cabNumber
        }
        const Cab = await Cabmodels.find(filter)
            .sort({ createdAt: -1 });


        res.json({
            success: true,
            data: Cab
        })

    } catch (error) {
        res.json({
            success: false,
            message: "error found",
            status: INTERNAL_SERVER_ERROR
        })
    }
}


//update cab
module.exports.updateCab = async (req, res) => {

    try {
        const Cab_id = req.params.id;
        const {
            cabNumber, cabName, operator, vehicleType, city, seatingCapacity, luggageCapacity, baseFare, pricePerKm,
            pricePerMinute, airConditioned, wifiAvailable, musicAvailable,
            driverName, driverPhone, driverImage, driverExperience, driverRating,
            isActive, underMaintenance,
            vehicleModel, fuelType,
            rating, cancellationPolicy, notes

        } = req.body;

        const findCab = await Cabmodels.findById(Cab_id);

        if (!findCab) {
            return res.json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: "cab not found"
            });

        }

        const updateData = {
            cabNumber,
            cabName,
            operator,
            vehicleType,
            seatingCapacity,
            luggageCapacity,
            city,
            baseFare,
            pricePerKm,
            pricePerMinute,

            airConditioned,
            wifiAvailable,
            musicAvailable,

            driverName,
            driverPhone,

            driverExperience,
            driverRating,

            isActive,
            underMaintenance,

            vehicleModel,
            fuelType,

            rating,
            cancellationPolicy,

            notes,

            cabImage: req.files?.cabImage?.[0]?.filename,
            driverImage: req.files?.driverImage?.[0]?.filename
        };


        const updateCab = await Cabmodels.findByIdAndUpdate(Cab_id, updateData, { new: true });

        if (updateCab) {
            return res.json({
                success: true,
                status: StatusCodes.OK,
                message: "update cab successfully",

            });
        }

    } catch (error) {
        console.log(error);

        return res.json({
            success: false,
            message: error.message
        })
    }
}


//search cab route
// module.exports.searchCabRoute = async (req, res) => {

//   try {

//     const { pickupCity, dropCity } = req.query;

//     const cabs = await Cab.find({

//       city: {
//         $regex: pickupCity,
//         $options: "i"
//       },

//       isActive: true

//     });

//     return res.json({

//       success: true,
//       dropCity: dropCity,
//       total: cabs.length,
//       data: cabs

//     });

//   } catch (error) {

//     return res.json({
//       success: false,
//       message: error.message
//     });

//   }

// };




//cab seller bookings admin
module.exports.getCabSellerBookings = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required"
      });
    }

    const bookings = await Bookingmodel.find({
      bookingType: "cab"
    })
      .populate({
        path: "cabId",
        match: {
          sellerId: sellerId
        }
      })
      .populate("userId");

    const filteredBookings = bookings.filter(
      booking => booking.cabId !== null
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