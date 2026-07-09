


const flightModel = require("../../models/filghtmodel");
const statuscode=require("http-status-codes")

module.exports.searchFlightRoute = async (req, res) => {

try {


const { from, to, date } = req.query;

if (!from || !to) {

  return res.status(400).json({
    success: false,
    message: "from and to are required"
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

  }

};


if (date) {

  const selectedDate = new Date(date);

  query.departuretime = {

    $gte: new Date(
      selectedDate.setHours(0, 0, 0, 0)
    ),

    $lte: new Date(
      selectedDate.setHours(23, 59, 59, 999)
    )

  };

}

const flights = await flightModel.find(query)
  .sort({ createdAt: -1 });

return res.status(200).json({

  success: true,
  total: flights.length,
  data: flights

});

} catch (error) {

return res.status(500).json({

  success: false,
  message: error.message

});


}

};

//FRONT VIEW FLIGHT
module.exports.frontViewFlight = async (req, res) => {

  try {

      console.log(
      "Collection:",
      flightModel.collection.name
    );

    const count =
      await flightModel.countDocuments();

    console.log("Count:", count);

      //  console.log("DB:", mongoose.connection.name);

    const flights = await flightModel
      .find()
      .sort({ createdAt: -1 });
    //    console.log("Flights found:", flights.length);
    // console.log("First flight:", flights[0]);

    if (flights.length === 0) {

      return res.json({

        success: false,
        status: 400,
        message: "Flights not found"

      });

    }
      

    const flightData = flights.map((flight) => {

      return {

        _id: flight._id,

        // ===== BASIC =====
        flightnumber:
          flight.flightnumber,

        airline:
          flight.airline,

        airlineCode:
          flight.airlineCode,

        // ===== FROM =====
        from: {

          city:
            flight.from?.city,

          airport:
            flight.from?.airport,

          code:
            flight.from?.code

        },

        // ===== TO =====
        to: {

          city:
            flight.to?.city,

          airport:
            flight.to?.airport,

          code:
            flight.to?.code

        },

        // ===== TIMINGS =====
        departuretime:
          flight.departuretime,

        arrivaltime:
          flight.arrivaltime,

        duration:
          flight.duration,

        // ===== STOPS =====
        stops:
          flight.stops,

        // ===== CLASSES =====
        classes:
          flight.classes,

        // ===== STATUS =====
        status:
          flight.status,

        // ===== AIRCRAFT =====
        aircraft:
          flight.aircraft,

        // ===== BAGGAGE =====
        baggage:
          flight.baggage,

        // ===== FARE RULES =====
        fareRules:
          flight.fareRules,

        // ===== CREATED BY =====
        createdBy:
          flight.createdBy,

        // ===== CREATED AT =====
        createdAt:
          flight.createdAt

      };

    });
  

    return res.json({

      success: true,
      status: 200,

      message:
        "All flights fetched successfully",

      data: flightData

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


module.exports.getOneFlight=async(req , res)=>{
try {
    const {id}=req.params
 if (!id) {
    return res.json({
         status:statuscode.BAD_REQUEST,
         success:false,
         message:"Flight Id is Required"
    })
    
 }

    const  viewFlight=await flightModel.findOne({_id:id})
    if (viewFlight) {
        return res.json({
            status:statuscode.OK,
            success:true,
            message:"Flight Data find Successfully",
            data:viewFlight
        })
        
    } else {
        return res.json({
            status:statuscode.BAD_REQUEST,
            success:false,
            message:"Flight Data not Found "
        })
        
    }
} catch (error) {
    return res.json({
        status:statuscode.BAD_REQUEST,
        success:"false",
        message:error.message

    })
}

}
