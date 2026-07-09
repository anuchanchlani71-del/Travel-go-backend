// const mongoose=require('mongoose')

// const flightSchema = new mongoose.Schema({

//   flightnumber: String,
//   airline: String,
//   airlineCode: String,

//   from: {
//     city: String,
//     airport: String,
//     code: String
//   },

//   to: {
//     city: String,
//     airport: String,
//     code: String
//   },

//   departuretime: Date,
//   arrivaltime: Date,
//   duration: Number,

//   stops: [
//     {
//       city: String,
//       airport: String,
//       code: String,
//       arrivalTime: Date,
//       departureTime: Date
//     }   
//   ],

//   classes: {
//     economy: {
//       price: Number,
//       seats: Number,
//       availableSeats: Number
//     },
//     business: {
//       price: Number,
//       seats: Number,
//       availableSeats: Number
//     }
//   },

//   status: {
//     type: String,
//     default: "On Time"
//   },

//   aircraft: {
//     name: String,
//     code: String
//   },

//   baggage: {
//     checkIn: String,
//     cabin: String
//   },

//   fareRules: {
//     refundable: Boolean,
//     cancellationFee: Number,
//     rescheduleFee: Number
//   },

//   amenities: [String],

//   createdBy: String

// }, { timestamps: true });




// const bookingflightSchema=new mongoose.Schema({
//     flightid:{type:mongoose.Schema.Types.ObjectId, ref:"flightsdetails"},
//     passangerName:{type:String},
//     passangerEmail:{type:String},
//     totalseatsBooked:{type:Number}
// },
// {timestamps:true})

// const BookingModel = mongoose.model("flightbooking",bookingflightSchema)
// const flightModel = mongoose.model("flightmodel",flightSchema)


// module.exports = { flightModel, BookingModel }





const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({

  flightnumber: String,
  airline: String,
  airlineCode: String,

  from: {
    city: String,
    airport: String,
    code: String
  },

  to: {
    city: String,
    airport: String,
    code: String
  },

  departuretime: Date,
  arrivaltime: Date,
  duration: Number,

  stops: [
    {
      city: String,
      airport: String,
      code: String,
      arrivalTime: Date,
      departureTime: Date
    }   
  ],

  classes: {
    economy: {
      price: Number,
      seats: Number,
      availableSeats: Number,

      // 👇 yaha add karo
      amenities: [
        {
          name: String,
          included: Boolean, // free ya paid
          price: Number
        }
      ]
    },

    business: {
      price: Number,
      seats: Number,
      availableSeats: Number,

      // 👇 yaha add karo
      amenities: [
        {
          name: String,
          included: Boolean,
          price: Number
        }
      ]
    } 
  },

  status: {
    type: String,
    default: "On Time"
  },

  aircraft: {
    name: String,
    code: String
  },

  baggage: {
    checkIn: String,
    cabin: String
  },

  fareRules: {
    refundable: Boolean,
    cancellationFee: Number,
    rescheduleFee: Number
  },

  // ❌ ye hata do (global amenities nahi chahiye)
  // amenities: [String],

  createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Company"
  },

}, { timestamps: true })



// const bookingflightSchema = new mongoose.Schema({
//   flightid: { type: mongoose.Schema.Types.ObjectId, ref: "flightsdetails" },
//   passangerName: String,
//   passangerEmail: String,
//   totalseatsBooked: Number
// }, { timestamps: true })

// const BookingModel = mongoose.model("flightbooking", bookingflightSchema)
const flightModel = mongoose.model("flightmodel", flightSchema)

// module.exports = { flightModel }
module.exports = flightModel;
