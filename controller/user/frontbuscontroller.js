
const { get } = require("mongoose");
const busmodel = require("../../models/busModel");



module.exports.frontViewBus = async (req, res) => {

  try {

    const SITEURL =
      `${process.env.SITEURL}/uploads/buses/`;

    const buses = await busmodel.find({

      status: "Active"

    }).sort({ createdAt: -1 });

    if (buses.length === 0) {

      return res.json({

        success: false,
        status: 400,

        message: "Bus not found"

      });

    }

    const busData = buses.map((bus) => {

      return {

        _id: bus._id,

        // ===== BASIC =====
        busName: bus.busName,
        busNumber: bus.busNumber,

        operatorName:
          bus.operatorName,

        operatorId:
          bus.operatorId,

        busType:
          bus.busType,

        // ===== ROUTE =====
        from: {
          city:
            bus.from?.city,

          state:
            bus.from?.state,

          busStand:
            bus.from?.busStand,

          code:
            bus.from?.code
        },

        to: {
          city:
            bus.to?.city,

          state:
            bus.to?.state,

          busStand:
            bus.to?.busStand,

          code:
            bus.to?.code
        },

        // ===== TIMING =====
        departureTime:
          bus.departureTime,

        arrivalTime:
          bus.arrivalTime,

        duration:
          bus.duration,

        // ===== STOPS =====
        stops:
          bus.stops,

        // ===== DROPPING =====
        droppingPoints:
          bus.droppingPoints,

        // ===== SEATS =====
        totalSeats:
          bus.totalSeats,

        availableSeats:
          bus.availableSeats,

        seatLayout:
          bus.seatLayout,

        // ===== PRICE =====
        price:
          bus.price,

        tax:
          bus.tax,

        discount:
          bus.discount,

        // ===== AMENITIES =====
        amenities:
          bus.amenities,

        // ===== IMAGES =====
        images:
          bus.images?.map(
            (img) => SITEURL + img
          ) || [],

        // ===== POLICY =====
        cancellationPolicy:
          bus.cancellationPolicy,

        // ===== STATUS =====
        status:
          bus.status,

        // ===== CREATED =====
        createdAt:
          bus.createdAt

      };

    });

    return res.json({

      success: true,
      status: 200,

      message:
        "All buses fetched successfully",

      data: busData

    });

  } catch (error) {

    console.log(error);

    return res.json({

      success: false,
      status: 500,

      message: error.message

    });

  }

};


//search bus route
module.exports.searchBusRoute = async (req, res) => {

  try {

    const { from, to, date } = req.query;

    if (!from || !to) {

      return res.status(400).json({

        success: false,

        message:
          "from and to are required"

      });

    }

   const query = {

  "from.city": {
    $regex: `^${from.trim()}$`,
    $options: "i"
  },

  "to.city": {
    $regex: `^${to.trim()}$`,
    $options: "i"
  },

  status: "Active"

};

    // DATE FILTER
    if (date) {

      const selectedDate =
        new Date(date);

      query.departureTime = {

        $gte: new Date(
          selectedDate.setHours(
            0, 0, 0, 0
          )
        ),

        $lte: new Date(
          selectedDate.setHours(
            23, 59, 59, 999
          )
        )

      };

    }

    const buses = await busmodel.find(query)

      .sort({ createdAt: -1 });

    return res.status(200).json({

      success: true,

      total: buses.length,

      data: buses

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

// Get single bus details
module.exports.singleBus = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Bus ID is required"
      });
    }

    let bus = await busmodel.findById(id);

    if (!bus) {
      return res.status(404).json({
        success: false,
        message: "Bus not found"
      });
    }

    // Auto-populate seat layout if missing or empty in database
    if (!bus.seatLayout || bus.seatLayout.length === 0) {
      const layout = [];
      const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
      rows.forEach((row) => {
        for (let i = 1; i <= 4; i++) {
          const seatNum = `${row}${i}`;
          const seatType = (row === "G" || row === "H") ? "Sleeper" : "Seater";
          layout.push({
            seatNumber: seatNum,
            seatType: seatType,
            gender: "Any",
            isBooked: false,
            price: seatType === "Sleeper" ? bus.price + 150 : bus.price
          });
        }
      });
      bus.seatLayout = layout;
      bus.availableSeats = layout.length;
      bus.totalSeats = layout.length;
      await bus.save();
    }

    return res.status(200).json({
      success: true,
      data: bus
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};