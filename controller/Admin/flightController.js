const statuscode = require("http-status-codes")
const  flightModel = require("../../models/filghtmodel")
const Bookingmodel = require("../../models/Bookingmodel")


module.exports.addflights = async (req, res) => {
  try {
    const {
      flightnumber,
      airline,
      airlineCode,
      from,
      to,
      departuretime,
      arrivaltime,
      duration,
      stops,
      classes,
      aircraft,
      baggage,
      fareRules,
      createdBy
    } = req.body

    // check duplicate
    const findflight = await flightModel.findOne({ flightnumber })
    if (findflight) {
      return res.json({
        status: statuscode.StatusCodes.BAD_REQUEST,
        success: false,
        message: "Flight already exists"
      })
    }

    const addflights = await flightModel.create({
      flightnumber,
      airline,
      airlineCode,
      from,
      to,
      departuretime,
      arrivaltime,
      duration,
      stops,
      classes, // 👈 important (isme hi amenities hain)
      aircraft,
      baggage,
      fareRules,
      createdBy
    })

    return res.json({
      status: statuscode.StatusCodes.OK,
      success: true,
      message: "Flight added successfully",
      data: addflights
    })

  } catch (error) {
    return res.json({
      status: statuscode.StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })
  }
}



module.exports.updateFlights = async (req, res) => {
  try {
    const flight_Id = req.params.id

    if (!flight_Id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Flight Id is required"
      })
    }

    const findFlight = await flightModel.findById(flight_Id)

    if (!findFlight) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Flight does not exist in database"
      })
    }

    const {
      flightnumber,
      airline,
      airlineCode,
      from,
      to,
      departuretime,
      arrivaltime,
      duration,
      stops,
      classes,
      aircraft,
      baggage,
      fareRules,
      createdBy
    } = req.body

    const flightupdatedata = {
      flightnumber,
      airline,
      airlineCode,
      from,
      to,
      departuretime,
      arrivaltime,
      duration,
      stops,
      classes,
      aircraft,
      baggage,
      fareRules,
      createdBy
    }

    const updateflight = await flightModel.findByIdAndUpdate(
      flight_Id,
      flightupdatedata,
      { new: true }
    )

    return res.json({
      status: statuscode.OK,
      success: true,
      message: "Flight data updated successfully",
      data: updateflight
    })

  } catch (error) {
    console.log("error", error)

    return res.json({
      status: statuscode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    })
  }
}

module.exports.deleteFlights = async (req, res) => {
  try {
    const { id } = req.params;   // ✅ FIX HERE

    if (!id) {
      return res.json({
        status: statuscode.StatusCodes.BAD_REQUEST,
        success: false,
        message: "Flight id is required"
      });
    }

    const findFlight = await flightModel.findById(id);

    if (!findFlight) {
      return res.json({
        status: statuscode.StatusCodes.BAD_REQUEST,
        success: false,
        message: "Flight not found"
      });
    }

    const deleted = await flightModel.deleteOne({ _id: id });

    return res.json({
      status: statuscode.StatusCodes.OK,
      success: true,
      message: "Flight deleted successfully",
      data: deleted
    });

  } catch (error) {
    return res.json({
      status: statuscode.StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
module.exports.getOneFlight = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Flight Id is Required"
      })

    }

    const viewFlight = await flightModel.findOne({ _id: id })
    if (viewFlight) {
      return res.json({
        status: statuscode.OK,
        success: true,
        message: "Flight Data find Successfully",
        data: viewFlight
      })

    } else {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Flight Data not Found "
      })

    }
  } catch (error) {
    return res.json({
      status: statuscode.BAD_REQUEST,
      success: "false",
      message: error.message

    })
  }

}


module.exports.getFlight = async (req, res) => {
  try {
    const seller_id = req.params.id

    const viewFlights = await flightModel.find({ createdBy: seller_id })
    if (viewFlights) {
      return res.json({
        status: statuscode.OK,
        success: true,
        message: "Flight Data find Successfully",
        data: viewFlights
      })

    } else {
      return res.json({
        status: statuscode.BAD_REQUEST,
        success: false,
        message: "Flights Data not Found "
      })

    }
  } catch (error) {
    return res.json({
      status: statuscode.BAD_REQUEST,
      success: "false",
      message: error.message

    })
  }

}


// module.exports.searchFlights = async (req, res) => {
//   try {
//     const {
//       from,
//       to,
//       date,
//       passengers = 1,
//       classType = "economy",
//       minPrice,
//       maxPrice,
//       airline,
//       nonStop,
//       page = 1,
//       limit = 10,
//       sortBy = "price" // price | duration | departure
//     } = req.query;

//     // 🔴 1. Validation
//     if (!from || !to || !date) {
//       return res.status(400).json({
//         success: false,
//         message: "from, to and date are required"
//       });
//     }

//     // 📅 2. Date range (full day)
//     const start = new Date(date);
//     const end = new Date(date);
//     end.setHours(23, 59, 59, 999);

//     // 🔍 3. Base Query (schema ke hisaab se)
//     let query = {
//       "from.code": from,
//       "to.code": to,
//       departuretime: { $gte: start, $lte: end },
//       [`classes.${classType}.availableSeats`]: { $gte: Number(passengers) }
//     };

//     // 💰 4. Price filter
//     if (minPrice || maxPrice) {
//       query[`classes.${classType}.price`] = {};
//       if (minPrice) query[`classes.${classType}.price`].$gte = Number(minPrice);
//       if (maxPrice) query[`classes.${classType}.price`].$lte = Number(maxPrice);
//     }

//     // 🏢 5. Airline filter
//     if (airline) {
//       query.airline = airline;
//     }

//     // 🛫 6. Non-stop filter
//     if (nonStop === "true") {
//       query.stops = { $size: 0 };
//     }

//     // 🔃 7. Sorting logic
//     let sortOption = {};

//     if (sortBy === "price") {
//       sortOption[`classes.${classType}.price`] = 1; // cheapest
//     } else if (sortBy === "duration") {
//       sortOption.duration = 1; // shortest
//     } else if (sortBy === "departure") {
//       sortOption.departuretime = 1; // earliest
//     }

//     // 📄 8. Pagination
//     const skip = (Number(page) - 1) * Number(limit);

//     // 📊 9. DB Query
//     const flights = await flightModel
//       .find(query)
//       .sort(sortOption)
//       .skip(skip)
//       .limit(Number(limit));

//     const total = await flightModel.countDocuments(query);

//     // 📦 10. Response
//     return res.status(200).json({
//       success: true,
//       message: "Flights fetched successfully",
//       total,
//       page: Number(page),
//       totalPages: Math.ceil(total / limit),
//       count: flights.length,
//       data: flights
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };    




module.exports.searchFlight = async (req, res) => {
  try {

    const { flightnumber } = req.query;

    let filter = {};

    // 🔍 Product Name Search
    if (flightnumber) {
      filter.flightnumber = { $regex: flightnumber, $options: "i" };
    }

    // 🔍 Category Search
    // if (category_id) {
    //   filter.category_id = category_id;
    // }
    // const SITEURL = `${process.env.SITEURL}/uploads/users/`;
    const flight = await flightModel.find(filter)
      .populate("flightnumber", "flightnumber")
      .sort({ createdAt: -1 });
    // const finalProducts = products.map(p => ({
    //   ...p._doc,
    //   product_image: p.product_image ? SITEURL + p.product_image : null
    // }));

    res.json({
      success: true,
      data: flight
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong"
    });
  }
};






//flight seller bookings
module.exports.getFlightSellerBookings = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({
        success: false,
        message: "sellerId is required"
      });
    }

    const bookings = await Bookingmodel.find({
      bookingType: "flight"
    })
      .populate({
        path: "flightId",
        match: {
          createdBy: sellerId
        }
      })
      .populate("userId");

    const filteredBookings = bookings.filter(
      booking => booking.flightId !== null
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