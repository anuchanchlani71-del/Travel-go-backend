const { celebrate, Joi } = require("celebrate");

module.exports.trainValidations = celebrate({

  body: Joi.object({

    // ===== BASIC =====
    trainNumber: Joi.string().required(),

    trainName: Joi.string().required(),

    operator: Joi.string().allow("", null).optional(),

    // ===== STATIONS =====
    fromStation: Joi.object({

      stationName: Joi.string().required(),
      city:Joi.string().required(),

      stationCode: Joi.string().required()

    }).required(),

    toStation: Joi.object({

      stationName: Joi.string().required(),
      city:Joi.string().required(),

      stationCode: Joi.string().required()

    }).required(),

    // ===== TIMINGS =====
    departureTime: Joi.string().required(),

    arrivalTime: Joi.string().required(),

    durationMinutes: Joi.number().required(),

    journeyStartDate: Joi.date().allow("", null).optional(),

    journeyEndDate: Joi.date().allow("", null).optional(),

    // ===== RUNNING DAYS =====
    runningDays: Joi.array().items(

      Joi.string().valid(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      )

    ).optional(),

    // ===== STOPS =====
    stops: Joi.array().items(

      Joi.object({

        stopNumber: Joi.number()
          .allow("", null)
          .optional(),

        day: Joi.number()
          .allow("", null)
          .optional(),

        stationName: Joi.string()
          .allow("", null)
          .optional(),

        stationCode: Joi.string()
          .allow("", null)
          .optional(),

        arrivalTime: Joi.string()
          .allow("", null)
          .optional(),

        departureTime: Joi.string()
          .allow("", null)
          .optional(),

        haltTime: Joi.string()
          .allow("", null)
          .optional(),

        distance: Joi.number()
          .allow("", null)
          .optional()

      })

    ).optional(),

    // ===== TRAIN TYPE =====
    trainType: Joi.string().valid(

      "Express",
      "Superfast",
      "Rajdhani",
      "Shatabdi",
      "Duronto",
      "Passenger",
      "Local"

    ).optional(),

    // ===== FEATURES =====
    pantryAvailable: Joi.boolean().optional(),

    tatkalAvailable: Joi.boolean().optional(),

    underMaintenance: Joi.boolean().optional(),

    isActive: Joi.boolean().optional(),

    // ===== CANCELLATION =====
    cancellationPolicy: Joi.string()
      .allow("", null)
      .optional(),

    // ===== CLASSES =====
    classes: Joi.array().items(

      Joi.object({

        classType: Joi.string().valid(
          "SL",
          "3AC",
          "2AC",
          "1AC",
          "CC",
          "2S"
        )
        .allow("", null)
        .optional(),

        baseFare: Joi.number()
          .allow("", null)
          .optional(),

        totalSeats: Joi.number()
          .allow("", null)
          .optional(),

        availableSeats: Joi.number()
          .allow("", null)
          .optional()

      })

    ).optional(),

    // ===== SELLER =====
    sellerId: Joi.string()
      .allow("", null)
      .optional()

  }).unknown(true)

});