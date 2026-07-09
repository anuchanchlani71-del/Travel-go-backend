


const Bookingmodel = require("../../models/Bookingmodel");
const sellermodel=require("../../models/trainsellermodel");
const usermodel = require("../../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get sellers
module.exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await sellermodel.find();

    res.status(200).json({
      success: true,
      data: sellers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//get users
module.exports.getAllUsers = async (req, res) => {
  try {

    const users = await usermodel.find();

    const SITEURL = `${process.env.SITEURL}/uploads/users/`;

    const userData = users.map((user) => ({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile: user.mobile,
      address: user.address,
      role: user.role,
      status: user.status,
      image: user.image
        ? SITEURL + user.image
        : null
    }));

    res.status(200).json({
      success: true,
      data: userData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





//train bookings
module.exports.getAllTrainBookings = async (req, res) => {
  try {
    const bookings = await Bookingmodel.find({
      bookingType: "train"
    })
      .populate("userId",
  "first_name last_name email mobile")
      .populate("trainId");

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//get  all cab bookings

module.exports.getAllCabBookings = async (req, res) => {
  try {
    const bookings = await Bookingmodel.find({
      bookingType: "cab"
    })
      .populate("userId",
  "first_name last_name email mobile")
      .populate("cabId");

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//get all flight booking
module.exports.getAllFlightBookings = async (req, res) => {
  try {
    const bookings = await Bookingmodel.find({
      bookingType: "flight"
    })
      .populate("userId",
  "first_name last_name email mobile")
      .populate("flightId");

    return res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//get all bus booking
module.exports.getAllBusBookings = async (req, res) => {
  try {
    const bookings = await Bookingmodel.find({
      bookingType: "bus"
    })
      .populate("userId",
  "first_name last_name email mobile")
      .populate("busId");

    return res.status(200).json({
      success: true,
      data: bookings
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





//superadmin login


module.exports.superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await usermodel.findOne({
      email,
      role: "superadmin"
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Super Admin not found"
      });
    }

    const passwordCheck = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordCheck) {
      return res.json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res.json({
      success: true,
      message: "Super Admin Login Successfully",
      data: admin,
      token
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const mongoose = require("mongoose");

module.exports.superAdminProfile = async (req, res) => {
  try {
    const { superadminId } = req.query;

    if (
      !superadminId ||
      !mongoose.Types.ObjectId.isValid(superadminId)
    ) {
      return res.json({
        success: false,
        message: "Invalid adminId"
      });
    }

    const superadmin = await usermodel.findById(superadminId);

    if (!superadmin) {
      return res.json({
        success: false,
        message: "Super Admin not found"
      });
    }

    const SITEURL = `${process.env.SITEURL}/uploads/users/`;

    const imageUrl = superadmin.image
      ? SITEURL + superadmin.image
      : "";

    const superAdminData = {
      _id: superadmin._id,
      first_name: superadmin.first_name,
      last_name: superadmin.last_name,
      email: superadmin.email,
      mobile: superadmin.mobile,
      address: superadmin.address,
      role: superadmin.role,
      status: superadmin.status,
      image: imageUrl
    };

    return res.json({
      success: true,
      data: superAdminData
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usermodel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.status = !user.status;
    await user.save();
    return res.status(200).json({ success: true, message: `User status changed to ${user.status ? "Active" : "Inactive"}`, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.updateSellerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await sellermodel.findById(id);
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }
    const isApproved = seller.status === "Approved" || seller.status === "approved";
    seller.status = isApproved ? "Rejected" : "Approved";
    seller.isVerified = !isApproved;
    await seller.save();
    return res.status(200).json({ success: true, message: `Seller status changed to ${seller.status}`, data: seller });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Bookingmodel.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    const isConfirmed = booking.bookingStatus === "Confirmed" || booking.bookingStatus === "confirmed";
    booking.bookingStatus = isConfirmed ? "Cancelled" : "Confirmed";
    await booking.save();
    return res.status(200).json({ success: true, message: `Booking status changed to ${booking.bookingStatus}`, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};