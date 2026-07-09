// const { celebrate, Joi } = require("celebrate");

// module.exports.companyValidation = celebrate({
// body: Joi.object({

// companyName: Joi.string()
// .min(3)
// .max(100)
// .required(),

// email: Joi.string()
// .email()
// .required(),

// phone: Joi.string()
// .pattern(/^[0-9]{10}$/)
// .required(),

// password: Joi.string()
// .min(6)
// .required(),

// serviceType: Joi.array()
// .items(
// Joi.string().valid("train","cab","bus","flight")
// )
// .required(),

// licenseNumber: Joi.string()
// .required(),

// authorizedPersonName: Joi.string()
// .min(3)
// .required(),

// role: Joi.string()
// .valid("seller","manager","admin")
// .optional(),

// status: Joi.string()
// .valid("pending","approved","rejected")
// .optional(),

// isVerified: Joi.boolean()
// .optional()

// }).unknown(false)
// });

const { celebrate, Joi } = require("celebrate");

module.exports.companyValidation = celebrate({
body: Joi.object({

 name: Joi.string().min(2).max(100).required(),

    email: Joi.string().email().required(),

    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be 10 digits"
      }),

    password: Joi.string().min(6).required(),

    companyName: Joi.string().min(2).max(150).required(),

    businessType: Joi.string()
      .valid("Flight", "Train", "Cab","Bus")
      .required(),

    gstNumber: Joi.string().optional().allow("", null),

    registrationNumber: Joi.string().optional().allow("", null),

    address: Joi.object({
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      fullAddress: Joi.string().required(),

      pinCode: Joi.string()
        .pattern(/^[0-9]{6}$/)
        .required()
        .messages({
          "string.pattern.base": "Pin code must be 6 digits"
        })
    }).required(),

    

    bankDetails: Joi.object({
      accountHolderName: Joi.string().required(),

      bankName: Joi.string().required(),

      accountNumber: Joi.string()
        .pattern(/^[0-9]{9,18}$/)
        .required()
        .messages({
          "string.pattern.base":
            "Account number must be between 9 to 18 digits"
        }),

      ifscCode: Joi.string()
        .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
        .required()
        .messages({
          "string.pattern.base": "Invalid IFSC Code"
        })
    }).required(),

    status: Joi.string()
      .valid("Pending", "Approved", "Rejected")
      .optional(),

    isVerified: Joi.boolean().optional()

}).unknown(false)
});