// // const mongoose = require("mongoose");

// // const trainSchema = new mongoose.Schema( {
// //     // ================= BASIC INFO =================
// //     trainNumber: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //       trim: true
// //     },
// //     trainName: {
// //       type: String,
// //       required: true,
// //       trim: true
// //     },

// //     // ================= STATIONS =================
// //     fromStation: {
// //       type: String,
// //       required: true
// //     },
// //     toStation: {
// //       type: String,
// //       required: true
// //     },
// //     fromStationCode: String,
// //     toStationCode: String,

// //     // ================= TIMING =================
// //     departureTime: {
// //       type: String,
// //       required: true
// //     },
// //     arrivalTime: {
// //       type: String,
// //       required: true
// //     },
// //     duration: String,

// //     // ================= JOURNEY DATE =================
// //     journeyStartDate: Date,
// //     journeyEndDate: Date,

// //     // ================= ROUTE =================
// //     runningDays: [String],

// //     stops: [
// //       {
// //         stationName: String,
// //         stationCode: String,
// //         arrivalTime: String,
// //         departureTime: String,
// //         haltTime: String
// //       }
// //     ],

// //     // ================= TRAIN TYPE =================
// //     trainType: {
// //       type: String,
// //       enum: [
// //         "Express",
// //         "Superfast",
// //         "Rajdhani",
// //         "Shatabdi",
// //         "Duronto",
// //         "Passenger",
// //         "Local"
// //       ],
// //       default: "Express"
// //     },

// //     operator: {
// //       type: String,
// //       default: "Indian Railways"
// //     },

// //     // ================= DISTANCE =================
// //     distance: Number,
// //     averageSpeed: Number,

// //     // ================= FEATURES =================
// //     pantryAvailable: {
// //       type: Boolean,
// //       default: false
// //     },
// //     tatkalAvailable: {
// //       type: Boolean,
// //       default: true
// //     },

// //     underMaintenance: {
// //       type: Boolean,
// //       default: false
// //     },

// //     bookingOpen: {
// //       type: Boolean,
// //       default: true
// //     },

// //     // ================= SEATS =================
// //     totalSeats: {
// //       type: Number,
// //       default: 0
// //     },
// //     availableSeats: {
// //       type: Number,
// //       default: 0
// //     },

// //     totalCoaches: Number,

// //     // ================= CLASSES =================
// //     classes: [
// //       {
// //         classType: String, // 1A, 2A, 3A, SL, CC
// //         price: Number,
// //         seatsAvailable: Number,
// //         tatkalPrice: Number
// //       }
// //     ],

// //     // ================= PRICING =================
// //     baseFare: Number,
// //     tax: Number,
// //     dynamicPricing: {
// //       type: Boolean,
// //       default: false
// //     },

// //     // ================= LIVE STATUS =================
// //     // status: {
// //     //   type: String,
// //     //   enum: ["Running", "Delayed", "Cancelled"],
// //     //   default: "Running"
// //     // },

// //     // delayInMinutes: {
// //     //   type: Number,
// //     //   default: 0
// //     // },

// //     // platformNumber: String,

// //     // ================= EXTRA =================
// //     cancellationPolicy: String,
// //     rating: {
// //       type: Number,
// //       default: 0
// //     }  
// //     // trainImage: String,
// //     // isActive: {
// //     //   type: Boolean,
// //     //   default: true
// //     // }

// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Train", trainSchema);




// const mongoose = require("mongoose");

// const trainSchema = new mongoose.Schema({

//   // ===== BASIC =====
//   trainNumber: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },

//   trainName: {
//     type: String,
//     required: true
//   },

//   operator: {
//     type: String,
//     default: "Indian Railways"
//   },

//   // ===== STATIONS =====
//   fromStation: {
//     name: String,
//     code: String
//   },

//   toStation: {
//     name: String,
//     code: String
//   },

//   // ===== TIME =====
//   departureTime: {
//     type: String,
//     required: true
//   },

//   arrivalTime: {
//     type: String,
//     required: true
//   },

//   durationMinutes: {
//     type: Number,
//     required: true
//   },



//   // ===== RUNNING DAYS =====
//   runningDays: {
//     type: [String],
//     enum: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
//   },

//   // ===== STOPS =====
//   stops: [
//     {
//       stopNumber: Number,
//       day: Number,
//       stationName: String,
//       stationCode: String,
//       arrivalTime: String,
//       departureTime: String,
//       haltTime: String,
//       distance: Number
//     }
//   ],

//   // ===== TRAIN TYPE =====
//   trainType: {
//     type: String,
//     enum: [
//       "Express",
//       "Superfast",
//       "Rajdhani",
//       "Shatabdi",
//       "Duronto",
//       "Passenger",
//       "Local"
//     ],
//     default: "Express"
//   },

//   // ===== FEATURES =====
//   pantryAvailable: {
//     type: Boolean,
//     default: false
//   },

//   tatkalAvailable: {
//     type: Boolean,
//     default: true
//   },

//   underMaintenance: {
//     type: Boolean,
//     default: false
//   },

//   isActive: {
//     type: Boolean,
//     default: true
//   },
// sellerId:{
// type:mongoose.Schema.Types.ObjectId,
// ref:"Company",
// required:true
// },
//   // ===== CANCELLATION =====
//   cancellationPolicy: String,

//   // ===== CLASSES =====
//   // classes: [
//   //   {
//   //     classType: {
//   //       type: String,
//   //       enum: ["SL", "3AC", "2AC", "1AC", "CC", "2S"]
//   //     },

//   //     baseFare: Number,

//   //     // ===== COACHES =====
//   //     coaches: [
//   //       {
//   //         coachNumber: String,

//   //         seats: [
//   //           {
//   //             seatNumber: Number,
//   //             berthType: String   // LB MB UB SL SU
//   //           }
//   //         ]
//   //       }
//   //     ]
//   //    }
      
//   // ],
// classes:[
// {
// classType:{
//  type:String,
//  enum:["SL","3AC","2AC","1AC","CC","2S"]
// },

// baseFare:Number,

// totalSeats:Number,

// availableSeats:Number
// }
// ],
 

// }, { timestamps: true });

// module.exports = mongoose.model("Train", trainSchema);

const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema({

  // ===== BASIC DETAILS =====
  trainNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  trainName: {
    type: String,
    required: true,
    trim: true
  },

  operator: {
    type: String,
    default: "Indian Railways"
  },

  trainType: {
    type: String,
    enum: [
      "Express",
      "Superfast",
      "Rajdhani",
      "Shatabdi",
      "Duronto",
      "Passenger",
      "Local"
    ],
    default: "Express"
  },

  // ===== STATION DETAILS =====
 
  


  fromStation: {
    stationName: {
      type: String
    },

    stationCode: {
      type: String
    },
     city: {
      type: String
    }

  },

  toStation: {
    stationName: {
      type: String
    },

    stationCode: {
      type: String
    },
     city: {
      type: String
    }
  },

  // ===== JOURNEY TIMINGS =====
  departureTime: {
    type: String,
    required: true
  },

  arrivalTime: {
    type: String,
    required: true
  },

  durationMinutes: {
    type: Number,
    required: true
  },

  journeyStartDate: {
    type: Date
  },

  journeyEndDate: {
    type: Date
  },

  // ===== RUNNING DAYS =====
  runningDays: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    }
  ],

  // ===== TRAIN STOPS =====
  stops: [
    {
      stopNumber: {
        type: Number
      },

      day: {
        type: Number
      },

      stationName: {
        type: String
      },

      stationCode: {
        type: String
      },

      arrivalTime: {
        type: String
      },

      departureTime: {
        type: String
      },

      haltTime: {
        type: String
      },

      distance: {
        type: Number
      }
    }
  ],

  // ===== FEATURES =====
  pantryAvailable: {
    type: Boolean,
    default: false
  },

  tatkalAvailable: {
    type: Boolean,
    default: false
  },

  underMaintenance: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  // ===== TRAIN CLASSES =====
  classes: [
    {
      classType: {
        type: String,
        enum: [
          "SL",
          "3AC",
          "2AC",
          "1AC",
          "CC",
          "2S"
        ]
      },

      baseFare: {
        type: Number
      },

      totalSeats: {
        type: Number
      },

      availableSeats: {
        type: Number
      }
    }
  ],

  // ===== CANCELLATION =====
  cancellationPolicy: {
    type: String
  },

  // ===== SELLER =====
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  }

},
{
  timestamps: true
});

module.exports = mongoose.model("Train", trainSchema);


