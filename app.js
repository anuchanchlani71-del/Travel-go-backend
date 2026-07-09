const connectDb=require("./config/db")
const express=require("express")
const { connect } = require("mongoose")
var cors = require('cors')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));


app.use(require('./routes/Adminroutes'))
app.use(require('./routes/userroutes')); 
app.use(require('./routes/superadminroutes'))


const PORT=5000
connectDb().then(()=>{
app.listen(PORT,()=>{
    console.log("SERVER START RUNNING")
    console.log("server running on port",PORT)
})
})