
const express=require('express')
const validation=require('../validations/uservalidation')
const usercontroller=require('../controller/user/usercontroller')
// const { useruploads}= require('../middleware/uploads')
const { useruploads } = require('../middleware/uploads')
const bookingController=require("../controller/user/cabBookingcontroller")
const bookingValidation=require("../validations/Bookingvalidation")
const  frontcabcontroller  = require('../controller/user/frontcabcontroller')
const fronttraincontroller= require("../controller/user/fronttraincontroller")
const frontflightcontroller=require("../controller/user/frontflightcontroller")
const frontbuscontroller=require("../controller/user/frontbuscontroller")
const trainbookingcontroller=require("../controller/user/trainBookingcontroller")
// const BookingValidation=require("../Validations/BookingValidation")
const FlightBookingcontroller=require("../controller/user/FlightBookingController")
const BusBookingcontroller=require("../controller/user/busBookingController")
const { createContact } = require("../controller/user/usercontroller");




const router=express.Router()



//user
router.post('/api/v1/register',useruploads.single("image"),usercontroller.registration);
router.post('/api/v1/login',useruploads.single("image"),usercontroller.login);
router.get('/api/v1/myprofile',usercontroller.myProfile)
router.put('/api/v1/updateprofile/:id' ,useruploads.single("image"),usercontroller.updateProfile)
router.post('/api/v1/changepwd' ,usercontroller.ChangePassword)
router.post('/api/v1/forgotpwd' ,usercontroller.forgetPassword)



//booking




router.post("/api/booking/add",bookingValidation.bookingValidation,bookingController.createCabBooking)
router.get("/api/booking/getBookings/:userId", bookingController.getMyBookings);


router.get("/api/front/frontviewcab",frontcabcontroller.frontViewCab);
router.get("/api/front/frontviewtrain",fronttraincontroller.frontViewTrain);
router.get("/api/front/searchroute",fronttraincontroller.searchroute);
router.get("/api/front/searchcabroute",frontcabcontroller.searchCabRoute)
router.get("/api/front/searchflightroute",frontflightcontroller.searchFlightRoute)
router.get("/api/front/frontviewflight",frontflightcontroller.frontViewFlight)
router.get("/api/front/frontviewbus",frontbuscontroller.frontViewBus)
router.get("/api/front/searchbusroute",frontbuscontroller.searchBusRoute)
router.get("/api/front/singlebus",frontbuscontroller.singleBus)
router.get("/api/front/singletrain",fronttraincontroller.singleTrain)
router.get("/api/front/singlecab",frontcabcontroller.singleCab)


//booking

router.post("/api/booking/addtrain",bookingValidation.bookingValidation, trainbookingcontroller.createTrainBooking )
router.get("/api/booking/gettrain/:userId", trainbookingcontroller.getTrainBookings )

router.post("/api/booking/busbooking",bookingValidation.bookingValidation,BusBookingcontroller.createBusBooking)
router.post("/api/booking/flightbooking",bookingValidation.bookingValidation,FlightBookingcontroller.createFlightBooking)
router.get("/api/booking/getSingleFlight/:id",frontflightcontroller.getOneFlight)




//destination

router.get(
  "/api/v1/popular-destinations",usercontroller.getPopularDestinations);
router.get("/api/check", (req, res) => {
  res.send("working");
});

//contact-us


// 📩 Contact route
router.post("/api/v1/contact", usercontroller.createContact);

module.exports=router;