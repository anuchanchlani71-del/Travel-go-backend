const { celebrate, Joi } = require("celebrate");

module.exports.cabValidations = celebrate({
  body: Joi.object({

    cabName: Joi.any(),
    operator: Joi.any(),
    vehicleType: Joi.any(),
    cabNumber: Joi.any(),

    cabBrand: Joi.any(),
    cabModel: Joi.any(),
    cabColor: Joi.any(),

    driverName: Joi.any(),
    driverPhone: Joi.any(),
    driverExperience: Joi.any(),
    driverRating: Joi.any(),

    seatingCapacity: Joi.any(),
    luggageCapacity: Joi.any(),

    baseFare: Joi.any(),
    pricePerKm: Joi.any(),
    pricePerMinute: Joi.any(),

    airConditioned: Joi.any(),
    wifiAvailable: Joi.any(),
    musicAvailable: Joi.any(),

    isActive: Joi.any(),
    underMaintenance: Joi.any(),

    vehicleModel: Joi.any(),
    fuelType: Joi.any(),

    rating: Joi.any(),

    cancellationPolicy: Joi.any(),
    notes: Joi.any(),

    sellerId: Joi.any()

  }).unknown(true)
});