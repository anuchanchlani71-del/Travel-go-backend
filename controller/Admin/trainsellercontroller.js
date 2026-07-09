const statuscodes = require("http-status-codes")
const bcrypt = require("bcrypt")
const companydetailmodel = require("../../models/trainsellermodel")
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;
const mongoose = require("mongoose");




module.exports.SellerRegister = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      companyName,
      businessType,
      gstNumber,
      registrationNumber,
      address,
      
      bankDetails
    } = req.body;

    // ✅ Check existing seller
    const existingSeller = await companydetailmodel.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingSeller) {
      return res.status(statuscodes.BAD_REQUEST).json({
        success: false,
        message: "Seller already exists with this email or phone"
      });
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create Seller
    const seller = await companydetailmodel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      companyName,
      businessType,
      gstNumber,
      registrationNumber,
      address,
      
      bankDetails,
      status: "Pending",
      isVerified: false
    });

    return res.status(statuscodes.CREATED).json({
      success: true,
      message: "Seller registered successfully",
      data: seller
    });

  } catch (error) {
    console.log(error);

    return res.status(statuscodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};




//login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const company = await companydetailmodel.findOne({ email })
        if (!company) {
            return res.json({
                success: false,
                message: "this company is not registered",
                status: statuscodes.BAD_REQUEST
            })
        }
        const passwordCheck = await bcrypt.compare(password, company.password)
        if (!passwordCheck) {
            return res.json({
                success: false,
                message: "Invalid password",
                status: statuscodes.BAD_REQUEST


            })
        }

        const token = jwt.sign(
            { id: company._id, name: company.companyName, email: company.email, role: company.role },
            process.env.JWT_SECRET,
            { expiresIn: '3d' }
        )
        return res.json({
            status: statuscodes.OK,
            message: "company login successfully",
            success: true,
            data: company,
            token: token
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            status: statuscodes.INTERNAL_SERVER_ERROR,
            message: error.message,
            success: false
        })
    }
}




module.exports.myProfile = async (req, res) => {
  try {
    const { sellerId } = req.query;

    console.log("sellerId:", sellerId);

    if (!sellerId || !mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.json({
        success: false,
        message: "Invalid sellerId"
      });
    }

    const findCompany = await companydetailmodel.findById(sellerId);

    if (!findCompany) {
      return res.json({
        success: false,
        message: "company not found"
      });
    }

    return res.json({
      success: true,
      data: findCompany
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};