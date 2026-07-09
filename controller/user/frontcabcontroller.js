const { get } = require("mongoose");
const Cabmodels = require("../../models/Cabmodels");

module.exports.frontViewCab = async (req, res) => {

  try {

    const SITEURL =
      `${process.env.SITEURL}/uploads/cabs/`;

    const cabs = await Cabmodels.find({
      isActive: true
    }).sort({ createdAt: -1 });

    if (cabs.length === 0) {

      return res.json({
        success: false,
        status: 400,
        message: "Cab not found"
      });

    }

    const cabData = cabs.map((cab) => {

      return {

        _id: cab._id,

        cabName: cab.cabName,
        operator: cab.operator,

        vehicleType: cab.vehicleType,
        cabNumber: cab.cabNumber,

        cabBrand: cab.cabBrand,
        cabModel: cab.cabModel,
        cabColor: cab.cabColor,

        driverName: cab.driverName,
        driverPhone: cab.driverPhone,

        driverExperience:
          cab.driverExperience,

        driverRating:
          cab.driverRating,

        seatingCapacity:
          cab.seatingCapacity,

        luggageCapacity:
          cab.luggageCapacity,

        baseFare: cab.baseFare,
        pricePerKm: cab.pricePerKm,
        pricePerMinute:
          cab.pricePerMinute,

        airConditioned:
          cab.airConditioned,

        wifiAvailable:
          cab.wifiAvailable,

        musicAvailable:
          cab.musicAvailable,

        fuelType: cab.fuelType,

        rating: cab.rating,

        cancellationPolicy:
          cab.cancellationPolicy,

        notes: cab.notes,

        cabImage:
          cab.cabImage
            ? SITEURL + cab.cabImage
            : "",

        driverImage:
          cab.driverImage
            ? SITEURL + cab.driverImage
            : "",

        createdAt:
          cab.createdAt

      };

    });

    return res.json({

      success: true,
      status: 200,

      message:
        "All cabs fetched successfully",

      data: cabData

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


module.exports.searchCabRoute = async (req, res) => {

  try {

    const { city } = req.query;

    const SITEURL =
      `${process.env.SITEURL}/uploads/cabs/`;

    if (!city) {

      return res.json({

        success: false,

        message: "city is required"

      });

    }

    const query = {

      city: {

        $regex: `^${city.trim()}$`,

        $options: "i"

      },

      isActive: true

    };

    // FETCH CABS
    const cabs =
      await Cabmodels.find(query)

      .sort({ createdAt: -1 });

    // IMAGE URL ADD
    const cabdata = cabs.map((cab) => ({

      ...cab._doc,

      cabImage:
        cab.cabImage
          ? SITEURL + cab.cabImage
          : ""

    }));

    return res.json({

      success: true,

      total: cabdata.length,

      data: cabdata

    });

  } catch (error) {

    return res.json({

      success: false,

      message: error.message

    });

  }

};


//front single cab

exports.singleCab = async (req, res) => {
  try {
    const { id } = req.query;

    const cab = await Cabmodels.findById(id);

    if (!cab) {
      return res.status(404).json({
        success: false,
        message: "Cab not found"
      });
    }

    res.status(200).json({
      success: true,
      data: cab
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};