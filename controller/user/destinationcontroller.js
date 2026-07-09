const Destination = require("../models/Destination");


const Destination = require("../models/Destination");

module.exports.addDestination = async (req, res) => {
  try {
    const { name, tag, price } = req.body;

    const image = req.file ? req.file.filename : "";

    const newDest = await Destination.create({
      name,
      tag,
      price,
      image,
    });

    res.json({
      success: true,
      message: "Destination added successfully",
      data: newDest,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};




module.exports.getPopularDestinations = async (req, res) => {
  try {
    const data = await Destination.find();

    const SITEURL = `${process.env.SITEURL}/uploads/`;

    const result = data.map((item) => ({
      _id: item._id,
      name: item.name,
      tag: item.tag,
      price: item.price,
      image: item.image ? SITEURL + item.image : "",
    }));

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const Destination = require("../models/Destination");

// DELETE DESTINATION
module.exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;

    await Destination.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Destination deleted successfully",
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};



const Destination = require("../models/Destination");

module.exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tag, price } = req.body;

    const updateData = {
      name,
      tag,
      price,
    };

    // sirf filename store karo (same as profile system)
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Destination.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    const SITEURL = `${process.env.SITEURL}/uploads/`;

    const responseData = {
      _id: updated._id,
      name: updated.name,
      tag: updated.tag,
      price: updated.price,
      image: updated.image ? SITEURL + updated.image : "",
    };

    res.json({
      success: true,
      message: "Destination updated successfully",
      data: responseData,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};