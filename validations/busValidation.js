// const Joi = require("celebrate");

const { Joi, celebrate } = require("celebrate");

module.exports .busValidationSchema=  celebrate({
    body: Joi.object().keys({

  // ================= BASIC INFO =================

  busName: Joi.string().required(),

  busNumber: Joi.string().required(),

  operatorName: Joi.string().required(),

  operatorId: Joi.string().optional(),

  // ================= BUS TYPE =================

  busType: Joi.string()
    .valid(
      "AC Sleeper",
      "Non-AC Sleeper",
      "AC Seater",
      "Non-AC Seater",
      "Volvo",
      "Semi Sleeper"
    )
    .required(),

  // ================= ROUTE =================

  from: Joi.object({

    city: Joi.string().required(),

    state: Joi.string().required(),

    busStand: Joi.string().required(),

    code: Joi.string().required()

  }).required(),

  to: Joi.object({

    city: Joi.string().required(),

    state: Joi.string().required(),

    busStand: Joi.string().required(),

    code: Joi.string().required()

  }).required(),

  // ================= TIMING =================

  departureTime: Joi.date().required(),

  arrivalTime: Joi.date().required(),

  duration: Joi.number().required(),

  // ================= STOPS =================

  stops: Joi.array().items(

    Joi.object({

      city: Joi.string().required(),

      busStand: Joi.string().required(),

      arrivalTime: Joi.date().required(),

      departureTime: Joi.date().required()

    })

  ),

  // ================= BOARDING POINTS =================

  boardingPoints: Joi.array().items(

    Joi.object({

      location: Joi.string().required(),

      address: Joi.string().required(),

      time: Joi.date().required()

    })

  ),

  // ================= DROPPING POINTS =================

  droppingPoints: Joi.array().items(

    Joi.object({

      location: Joi.string().required(),

      address: Joi.string().required(),

      time: Joi.date().required()

    })

  ),

  // ================= SEAT INFO =================

  totalSeats: Joi.number().required(),

  availableSeats: Joi.number().required(),

  seatLayout: Joi.array().items(

    Joi.object({

      seatNumber: Joi.string().required(),

      seatType: Joi.string()
        .valid("Sleeper", "Seater")
        .required(),

      gender: Joi.string()
        .valid("Male", "Female", "Any")
        .default("Any"),

      isBooked: Joi.boolean().default(false),

      price: Joi.number().required()

    })

  ),

  // ================= PRICE =================

  price: Joi.number().required(),

  tax: Joi.number().default(0),

  discount: Joi.number().default(0),

  // ================= AMENITIES =================

  amenities: Joi.array().items(

    Joi.object({

      name: Joi.string().optional(),

      included: Joi.boolean().optional()

    })

  ),

  // ================= BUS IMAGES =================

  images: Joi.array().items(
    Joi.string()
  ),

  // ================= RATINGS =================

  // rating: Joi.number().default(0),

  // totalReviews: Joi.number().default(0),

  // // ================= LIVE STATUS =================

  // liveTrackingEnabled: Joi.boolean().default(false),

  // currentLocation: Joi.object({

  //   lat: Joi.number(),

  //   lng: Joi.number()

  // }),

  // ================= POLICIES =================

  cancellationPolicy: Joi.object({

    refundable: Joi.boolean(),

    cancellationCharge: Joi.number()

  }),

  // ================= STATUS =================

  status: Joi.string()
    .valid(
      "Active",
      "Inactive",
      "Cancelled",
      "Delayed"
    )
    .default("Active"),

  // ================= CREATED BY =================

  // createdBy: Joi.string().required()

})});

// module.exports = busValidationSchema;