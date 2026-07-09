  const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
{
 name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  companyName: String,
  businessType: {
    type: String,
    enum: ["Flight", "Train", "Cab","Bus"]
  },
  gstNumber: String,
  registrationNumber: String,
  address: {
    country: String,
    state: String,
    city: String,
    fullAddress: String,
    pinCode: String
  },
 
  bankDetails: {
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifscCode: String
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Approved"
  },
  isVerified: {
    type: Boolean,
    default: true
  }


},
{
timestamps:true
}
);

module.exports = mongoose.model("Company", companySchema);