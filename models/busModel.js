const mongoose =require("mongoose")


const busSchema=new mongoose.Schema({

//================Basic Info====================
busName:{ type:String,required:true},
busNumber:{type:String,unique:true},
operatorName:{type:String,required:true},
operatorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Owner"
},
//====================Bus Type=================
busType:{
type:String,
enum:["AC Sleeper","Non-AC Sleeper","AC Seater","Non-AC Seater","Volvo","Semi Sleeper"],
required:true

},

//===================Route====================
from:{
    city:String,
    state:String,
    busStand:String,
    code:String
},
to:{
    city:String,
    state:String,
    busStand:String,
    code:String
},

//======================Timing==================
departureTime:{
    type:Date,
    required:true
},
arrivalTime:{
    type:Date,
    required:true
},
duration:{
    type:Number,// in minuties
},
stops:[
    {
        city:String,
        busStand:String,
        arrivalTime:Date,
        departureTime:Date
    }
],

//====================Dropping points======================

droppingPoints:[
    {
        location:String,
        address:String,
        time:Date
    }
],

//=================Seats Info=======================

totalSeats:{
    type:Number,
    required:true
},
availableSeats:{
    type:Number,
    required:true
},
seatLayout:[
    {
        seatNumber:String,
        seatType:{
            type:String,
            enum:["Sleeper","Seater"]
        },

        gender:{
            type:String,
            enum:["Male","Female","Any"],
            default:"Any"
        },
        isBooked:{
            type:Boolean,
            default:false
        },
        price:Number
    }
],

// ======================Price=================

price:{
    type:Number,
    required:true
},
tax:{
    type:Number,
    default:0
},
discount:{
    type:Number,
    default:0
},

//===================Amenities=================

amenities:[
    {
        name:String,
        included:Boolean
    }
],

//===============Bus Image==============
images:[String],


//====================Policies=================

cancellationPolicy:{
    refundable:Boolean,
    cancellationCharge:Number
},


//========================Status======================

status:{
    type:String,
    enum:[
        "Active",
        "InActive",
        "Cancelled",
        "Delayed"
    ],
    default:"Active"
},

//=======================Created By===============

// createdBy:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Owner"
// },

},

{
    timestamps:true
}
)
module.exports =
  mongoose.models.Busdata ||
  mongoose.model("Busdata", busSchema);

