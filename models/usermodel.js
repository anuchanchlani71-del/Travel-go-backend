const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
      first_name:{type:String,text:true},
    last_name:{type:String,text:true},
    email:{type:String,text:true},
    password:{type:String,text:true},
    address:{type:String,text:true},
      mobile:{type:String,text:true},
    image:{type:String,text:true},
    role:{type:String,text:true,default:"user"},
    status:{type:Boolean,default:true},
    resetString: {type: String,default: null}
  

},{timestamps:true})

module.exports=mongoose.model("Travelgouser",userSchema)