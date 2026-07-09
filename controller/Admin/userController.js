const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt= require("jsonwebtoken")

module.exports.userRegister=async (req,res) => {
    try {
        const {first_name,last_name,email,password,address,mobile}=req.body
        const findUser=await userModel.findOne({email})
        if (findUser) {
            return res.json({
                status:StatusCodes.BAD_REQUEST,
                success:false,
                message:"User Already Exist"
            })
            
        }

        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(password, saltRounds)

          const userData = {
            first_name: first_name,
            last_name: last_name,
            address: address,
            email: email,
            mobile: mobile,
            password: hashpassword,
            image: req.file?.filename
        }

        const addUser = await usermodel.create(userData)
        if (addUser) {return res.json({
            status:StatusCodes.OK,
            success:true,
            message:"User Register Successfully"
        })
            
        } else {
            return res.json({
                status:StatusCodes.BAD_REQUEST,
                success:false,
                message:"User Not Register "
            }) 
        }
    } catch (error) {
        return res.json({
            status:StatusCodes.INTERNAL_SERVER_ERROR,
            success:false,
            message:error.message
        })
    }
    
}