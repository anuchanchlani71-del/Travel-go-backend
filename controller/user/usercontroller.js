const usermodel = require("../../models/usermodel")
const bcrypt = require("bcrypt")
const StatusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
// const { useruploads } = require("../middleware/useruplaod")
// const sendEmail = require("../middleware/sendEmail")
const Destination=require("../../models/destinationmodel")
const Contact = require("../../models/contactModel");

//registration
module.exports.registration = async (req, res) => {
    try {
        const { first_name, last_name, address, email, mobile ,password} = req.body;

        const finduser = await usermodel.findOne({ email })
        if (finduser) {
            return res.json({
                status: StatusCodes.BAD_REQUEST,
                message: "user already exist",
                success: false
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
            image: req.file?.filename || null
        }

        const adduser = await usermodel.create(userData)





        await adduser.save()
        if (adduser) {
            res.json({
                Status: StatusCodes.OK,
                success: true,
                message: "user register successfully",
                data: userData

            })


        }
        else {
            res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "user not registered yet"
            })
        }
    } catch (error) {
        console.log("error", error)
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "error found"
        })
    }
}



//login


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await usermodel.findOne({ email ,status:true})  
        if (!findUser) {
            return res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message:"User not registered"
            });

        }
        const isValidPassword = await bcrypt.compare(password, findUser.password)


        if (!isValidPassword) {
            return res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "invalid password"
            });
        }




        const token = jwt.sign({ id: findUser._id, first_name: findUser.first_name, last_name: findUser.last_name, email: findUser.email }, process.env.JWT_SECRET, { expiresIn: '3d' });
    
//  await sendEmail({
//             email: findUser.email,
//             subject: 'user login',
//             message: `Hi ${findUser.first_name}${findUser.last_name}, you have successfully login in Electro account!`,
//            html: `
//   <div style="margin:0; padding:0; background:#f2f2f2; font-family: Arial, sans-serif;">
    
//     <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      
//       <!-- Header -->
//       <div style="text-align:center; padding:20px;">
//         <h2 style="margin:0; color:#333;">Electro</h2>
//       </div>

//       <!-- Banner -->
//       <div style="background: linear-gradient(to right, #3b5998, #2a5298); color:white; padding:30px; text-align:center;">
//         <h1 style="margin:0;">Account Login</h1>
//         <p style="margin-top:10px;">Secure Access Notification</p>
//       </div>

//       <!-- Body -->
//       <div style="padding:20px; color:#333;">
        
//         <h3>Dear ${findUser.first_name} ${findUser.last_name},</h3>
        
//         <p>
//           Welcome back to <strong>Electro</strong>.
//         </p>
        
//         <p>
//           You have successfully logged into your account.
//         </p>

//         <!-- Credentials Box -->
//         <div style="background:#f7f7f7; padding:15px; border-radius:6px; margin:20px 0;">
//           <p><strong>Email:</strong> ${findUser.email}</p>
//           <p><strong>Login Time:</strong> ${new Date().toLocaleString()}</p>
//         </div>

//         <!-- Warning -->
//         <p style="color:#777;">
//           If this wasn't you, please secure your account immediately.
//         </p>

       

//       </div>

//       <!-- Support -->
//       <div style="background:#fafafa; padding:15px; text-align:center;">
//         <p style="margin:0;">Need help? Contact our support team</p>
//         <p style="margin:5px 0;">support@electro.com | +1 234 567 890</p>
//       </div>

//       <!-- Footer -->
//       <div style="background:#2a5298; color:white; text-align:center; padding:10px;">
//         <p style="margin:0; font-size:12px;">
//           © 2026 Electro. All Rights Reserved
//         </p>
//       </div>

//     </div>
//   </div>
//   `

//         });




        res.json({
            status: StatusCodes.OK,
            success: true,
            message: "user login successfully",
            data: findUser,
            token: token


        })
    } catch (error) {
        console.log("error", error)
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "error found"
        })
    }
}



//my profile

module.exports.myProfile = async (req, res) => {
    try {

       const { _id } = req.query

        const findUser = await usermodel.findById(_id);

        if (!findUser) {
            return res.json({
                success: false,
                message: "user not found",
                status: StatusCodes.BAD_REQUEST,
            });
        }

        const SITEURl = `${process.env.SITEURL}/uploads/users/`;
        const UserImage = SITEURl + findUser.image

        const userData = {
            _id:_id, 
            first_name: findUser.first_name,
            last_name:findUser.last_name,
            address:findUser.address,
            email: findUser.email,
            image: UserImage,
            mobile:findUser.mobile,
            password:findUser.password
        };

        return res.json({
            status: StatusCodes.OK,
            message: "user found successfully",
            success: true,
            data: userData
        });

    } catch (error) {
        console.log("error", error)
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "error found"
        })
    }
};






//EDIT PROFILE
module.exports.updateProfile = async (req, res) => {
    try {
        const _id = req.params.id;

        const { first_name,last_name, email ,address,mobile} = req.body;
        const SITEURL = `${process.env.SITEURL}/uploads/users/`;


        const findUser = await usermodel.findById(_id);
 
        if (!findUser) {
            return res.json({
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: "User not found"
            });
        }

        const userdata = {
            first_name:first_name,
            last_name:last_name,
            address:address,
            mobile:mobile,
            email: email,
            image: req.file?.filename
        };

        const updateProfile = await usermodel.updateOne({ _id:_id }, userdata);

        if (updateProfile) {
            res.json({
                success: true,
                status: StatusCodes.OK,
                message: "update user successfully",
                // // data: {
                // //     ...userdata,
                // //     image: SITEURL + userdata.image
                // }
            });
        }

    } catch (error) {
        console.log("error", error)
        res.json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "error found"
        })
    }
}





//change pwd
module.exports.ChangePassword = async (req, res) => {
    try {

        const { userId, oldpassword, newpassword } = req.body

        const user = await usermodel.findById(userId)
        if (!user) {
            return res.json({
                status: StatusCodes.NOT_FOUND,
                success: false,
                message: "user not found"
            })
        }



      

        const Matchpassword = await bcrypt.compare(oldpassword, user.password)
        if (!Matchpassword) {
            return res.json({
                status: StatusCodes.BAD_REQUEST,
                success: false,
                message: "old password is wrong"
            })
        }

        const saltRounds = 10
        const hashpassword = await bcrypt.hash(newpassword, saltRounds)

        user.password = hashpassword

     



        await user.save()
//        await sendEmail({
//   email: user.email,
//   subject: 'Password Changed Successfully',
//   message: `Hi ${user.first_name} ${user.last_name}, your password has been changed.`,
//   html: `
//   <div style="margin:0; padding:0; background:#f4f6f9; font-family: Arial, sans-serif;">
    
//     <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
      
//       <!-- Header -->
//       <div style="text-align:center; padding:20px;">
//         <h2 style="margin:0; color:#333;">Electro</h2>
//       </div>

//       <!-- Banner -->
//       <div style="background: linear-gradient(to right, #28a745, #218838); color:white; padding:30px; text-align:center;">
//         <h1 style="margin:0;">Password Updated 🔐</h1>
//         <p style="margin-top:10px;">Your account security is important to us</p>
//       </div>

//       <!-- Body -->
//       <div style="padding:25px; color:#333;">
        
//         <h3>Dear ${user.first_name} ${user.last_name},</h3>
        
//         <p>
//           Your password has been <strong>successfully changed</strong>.
//         </p>
        
//         <p>
//           If you made this change, you can safely ignore this email.
//         </p>

//         <!-- Alert Box -->
//         <div style="background:#fff3cd; padding:15px; border-radius:6px; margin:20px 0; border-left:4px solid #ffc107;">
//           <strong>Didn't change your password?</strong>
//           <p style="margin:5px 0 0 0;">
//             Please contact our support team immediately to secure your account.
//           </p>
//         </div>

//         <!-- Info Box -->
//         <div style="background:#f7f7f7; padding:15px; border-radius:6px; margin:20px 0;">
//           <p><strong>Email:</strong> ${user.email}</p>
//           <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
//         </div>

//       </div>

//       <!-- Support -->
//       <div style="background:#fafafa; padding:15px; text-align:center;">
//         <p style="margin:0;">Need help? Contact our support team</p>
//         <p style="margin:5px 0;">support@electro.com | +1 234 567 890</p>
//       </div>

//       <!-- Footer -->
//       <div style="background:#224abe; color:white; text-align:center; padding:12px;">
//         <p style="margin:0; font-size:12px;">
//           © 2026 Electro. All Rights Reserved
//         </p>
//       </div>

//     </div>
//   </div>
//   `
// });

        res.json({
            status: StatusCodes.OK,
            success: true,
            message: "password changed successfully"
        })

    } catch (error) {
        console.log("error", error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//forget password
// module.exports.forgetPassword = async (req, res) => {
//     try {

//         const { email } = req.body;

//         const user = await usermodel.findOne({ email });
//         if (!user) {
//             return res.json({
//                 success: false,
//                 message: "user not found",
//                 status: StatusCodes.BAD_REQUEST
//             });
//         }

//         // generate random string
//         const resetString = Math.random().toString(36).substring(2, 8);

//         // save in DB
//         user.resetString = resetString;
//         user.resetExpiry = Date.now() + 10 * 60 * 1000;
//         await user.save();

//         // send email
//         await sendEmail({
//     email: user.email,
//     subject: "Reset Password",
//     message: "Reset password",
//     html: `
// <div style="margin:0; padding:0; background:#f4f6f9; font-family: Arial, sans-serif;">
  
//   <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
    
//     <!-- Header -->
//     <div style="text-align:center; padding:20px;">
//       <h2 style="margin:0; color:#333;">Electro</h2>
//     </div>

//     <!-- Banner -->
//     <div style="background: linear-gradient(to right, #ff6a00, #ee0979); color:white; padding:30px; text-align:center;">
//       <h1 style="margin:0;">Forgot Password 🔑</h1>
//       <p style="margin-top:10px;">Use the code below to reset your password</p>
//     </div>

//     <!-- Body -->
//     <div style="padding:25px; color:#333;">
      
//       <h3>Dear ${user.first_name} ${user.last_name},</h3>
      
//       <p>
//         We received a request to reset your password for your <strong>Electro</strong> account.
//       </p>
      
//       <p>
//         Please use the following reset code to create a new password:
//       </p>

//       <!-- Reset Code Box -->
//       <div style="background:#f7f7f7; padding:20px; border-radius:6px; margin:20px 0; text-align:center;">
//         <h2 style="margin:0; letter-spacing:4px; color:#224abe;">
//           ${resetString}
//         </h2>
//       </div>

//       <!-- Alert -->
//       <div style="background:#fff3cd; padding:15px; border-radius:6px; margin:20px 0; border-left:4px solid #ffc107;">
//         <strong>This code will expire in 10 minutes.</strong>
//         <p style="margin:5px 0 0 0;">
//           If you didn’t request a password reset, please ignore this email.
//         </p>
//       </div>

//       <!-- Info -->
//       <div style="background:#f7f7f7; padding:15px; border-radius:6px; margin:20px 0;">
//         <p><strong>Email:</strong> ${user.email}</p>
//         <p><strong>Requested At:</strong> ${new Date().toLocaleString()}</p>
//       </div>

//     </div>

//     <!-- Support -->
//     <div style="background:#fafafa; padding:15px; text-align:center;">
//       <p style="margin:0;">Need help? Contact our support team</p>
//       <p style="margin:5px 0;">support@electro.com | +1 234 567 890</p>
//     </div>

//     <!-- Footer -->
//     <div style="background:#224abe; color:white; text-align:center; padding:12px;">
//       <p style="margin:0; font-size:12px;">
//         © 2026 Electro. All Rights Reserved
//       </p>
//     </div>

//   </div>
// </div>
// `
// });

//         return res.json({
//             success: true,
//             message: "Reset string sent to email",
//             status: StatusCodes.OK
//         });

//     } catch (error) {
//         console.log(error);
//         return res.json({
//             success: false,
//             message: "error",
//             status: StatusCodes.INTERNAL_SERVER_ERROR
//         });
//     }
// };


// module.exports.forgetPassword = async (req, res) => {
//   try {
//     const { email, resetString, newPassword } = req.body;

//     const user = await usermodel.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // ===== CASE 1 : only email → send code =====
//     if (!resetString && !newPassword) {

//       const code = Math.random().toString(36).substring(2, 8);

//       user.resetString = code;
//       await user.save();

//       await sendEmail({
//         email: user.email,
//         subject: "Reset Password",
//         html: `<h3>Your reset code: ${code}</h3>`
//       });

//       return res.json({
//         success: true,
//         message: "Reset code sent to email"
//       });
//     }

//     // ===== CASE 2 : code + new password → change password =====
//     else {

//    if (user.resetString !== resetString.trim()){
//         return res.json({
//           success: false,
//           message: "Invalid reset code"
//         });
//       }

//       const hashpassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashpassword;
//       user.resetString = null;

//       await user.save();

//       return res.json({
//         success: true,
//         message: "Password updated successfully"
//       });
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };

// module.exports.forgetPassword = async (req, res) => {
//   try {
//     const { email, resetString, newPassword } = req.body;

//     const user = await usermodel.findOne({ email: email.trim() });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // SEND CODE
//     if (!resetString && !newPassword) {

//       const code = Math.random().toString(36).substring(2, 8);

//       user.resetString = code;
//       await user.save();

//       await sendEmail({
//         email: user.email,
//         subject: "Reset Password",
//         html: `<h3>Your reset code: ${code}</h3>`
//       });

//       return res.json({
//         success: true,
//         message: "Reset code sent to email"
//       });
//     }

//     // VERIFY CODE
//     else {

//       console.log("DB CODE:", user.resetString);
//       console.log("USER CODE:", resetString);

//       if (user.resetString !== resetString.trim()) {
//         return res.json({
//           success: false,
//           message: "Invalid reset code"
//         });
//       }

//       const hashpassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashpassword;
//       user.resetString = null;

//       await user.save();

//       return res.json({
//         success: true,
//         message: "Password updated successfully"
//       });
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };


// module.exports.forgetPassword = async (req, res) => {
//   try {
//     const { email, resetString, newPassword, savedCode } = req.body;

//     const user = await usermodel.findOne({ email: email.trim() });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found"
//       });
//     }

//     // ===== SEND CODE =====
//     if (!resetString && !newPassword) {

//       const code = Math.random().toString(36).substring(2, 8);

//       await sendEmail({
//         email: user.email,
//         subject: "Reset Code",
//         html: `<h3>Your code: ${code}</h3>`
//       });

//       return res.json({
//         success: true,
//         message: "Code sent",
//         code
//       });
//     }

//     // ===== VERIFY + UPDATE PASSWORD =====
//     else {

//       const compareCode = savedCode || user.resetString;

//       if (compareCode !== resetString.trim()) {
//         return res.json({
//           success: false,
//           message: "Invalid reset code"
//         });
//       }

//       // 🔐 HASH PASSWORD
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       user.password = hashedPassword;
//       await user.save();

//       return res.json({
//         success: true,
//         message: "Password updated successfully 🔐"
//       });
//     }

//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error"
//     });
//   }
// };





module.exports.forgetPassword = async (req, res) => {
  try {
    const { email, resetString, newPassword } = req.body;

    const user = await usermodel.findOne({ email: email.trim() });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // SEND CODE
    if (!resetString && !newPassword) {

      const code = Math.random().toString(36).substring(2, 8);

      user.resetString = code;
      await user.save();

      await sendEmail({
        email: user.email,
        subject: "Reset Code",
        html: `<h3>Your reset code: ${code}</h3>`
      });

      return res.json({
        success: true,
        message: "Code sent"
      });
    }

    // VERIFY CODE
    if (user.resetString !== resetString.trim()) {
      return res.json({
        success: false,
        message: "Invalid reset code"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetString = null;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully"
    });

  } catch (error) {
    res.json({
      success: false,
      message: "Error"
    });
  }
};


//popular destinations

module.exports.getPopularDestinations = async (req, res) => {
  try {
    const data = await Destination.find();

    const SITEURL = `${req.protocol}://${req.get("host")}/uploads/destinations/`;

    const result = data.map((item) => ({
      _id: item._id,
      name: item.name,
      tag: item.tag,
      price: item.price,
      image: item.image ? SITEURL + item.image : ""
    }));

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

//contact-us


// 📩 Create Contact
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};