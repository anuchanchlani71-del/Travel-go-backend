const { celebrate, Joi } = require("celebrate");

module.exports.bookingValidation = celebrate({
  body: Joi.object({

    // ================= COMMON =================
    userId: Joi.string().required(),

    bookingType: Joi.string()
      .valid("cab", "train", "bus", "flight")
      .required(),

    // ================= CAB =================
    cabId: Joi.when("bookingType", {
      is: "cab",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    pickupLocation: Joi.when("bookingType", {
      is: "cab",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    dropLocation: Joi.when("bookingType", {
      is: "cab",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),


    paymentMethod: Joi.string()
  .valid("upi", "card", "cash")
  .required(),

    // ================= TRAIN =================
    trainId: Joi.when("bookingType", {
      is: "train",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    classType: Joi.when("bookingType", {
      is: "train",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    journeyDate: Joi.when("bookingType", {
      is: Joi.valid("train", "bus", "flight"),
      then: Joi.date().required(),
      otherwise: Joi.forbidden()
    }),
    tatkalBooking: Joi.when("bookingType", {
  is: "train",
  then: Joi.boolean().optional(),
  otherwise: Joi.forbidden()
}),

    // ================= PASSENGERS =================
    // passengersDetails: Joi.array()
    //   .min(1)
    //   .items(
    //     Joi.object({

    //       name: Joi.string().required(),
    //       age: Joi.number().required(),
    //       gender: Joi.string().required(),

    //       // 👉 seat only for train
    //       seatNumber: Joi.when(Joi.ref("/bookingType"), {
    //         is: "train",
    //         then: Joi.number().required(),
    //         otherwise: Joi.forbidden()
    //       }),

    //       seatType: Joi.string().optional()

    //     })
    //   )
    //   .required()
     passengersDetails: Joi.when("bookingType", {
      is: Joi.valid("train", "bus", "flight"),
      then: Joi.array()
        .min(1)
        .items(
          Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required(),
            gender: Joi.string().required(),
            seatNumber: Joi.string().optional()
          })
        )
        .required(),
      otherwise: Joi.optional() // cab me optional  
    }),

      // ================= BUS =================
    busId: Joi.when("bookingType", {
      is: "bus",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    // busType: Joi.when("bookingType", {
    //   is: "bus",
    //   then: Joi.string()
    //     .valid(
    //       "AC Sleeper",
    //       "Non-AC Sleeper",
    //       "AC Seater",
    //       "Non-AC Seater",
    //       "Volvo",
    //       "Semi Sleeper"
    //     )
    //     .required(),
    //   otherwise: Joi.forbidden()
    // }),

    boardingPoint: Joi.when("bookingType", {
      is: "bus",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    droppingPoint: Joi.when("bookingType", {
      is: "bus",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

  

    // ================= FLIGHT =================
    flightId: Joi.when("bookingType", {
      is: "flight",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    fromAirport: Joi.when("bookingType", {
      is: "flight",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),

    toAirport: Joi.when("bookingType", {
      is: "flight",
      then: Joi.string().required(),
      otherwise: Joi.forbidden()
    }),
    // journeyDate handled above (train, bus, flight)
   

    travelClass: Joi.when("bookingType", {
      is: "flight",
      then: Joi.string()
        .valid("economy", "business")
        .required(),
      otherwise: Joi.forbidden()
    }),

  }).unknown(false)
});