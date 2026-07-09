const mongoose=require("mongoose")
async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to db")
     
    } catch (error) {
        console.log("error",err)
        console.log(error.message)
    }
}
module.exports=connectDb