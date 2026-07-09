const express = require("express");
const router = express.Router();


const cabcontroller=require("../controller/Admin/Cabcontroller")
const cabValidations=require("../validations/Cabvalidations");
const { cabuploads } = require("../middleware/uploads");
// const  cabCompanyValidation  = require("../validations/cabcompanyvalidation");
// const cabcompanycontroller=require("../controller/Admin/cabsellercontroller")
const traincontroller=require("../controller/Admin/traincontroller")
const trainvalidations=require("../validations/Trainvalidation")
const companydetailrcontroller=require("../controller/Admin/trainsellercontroller")
const companydetailvalidation=require("../validations/companydetailvalidation")

const flightvalidation = require("../Validations/flightValidation")
const flightcontroller = require("../controller/Admin/flightController")

const busValidation=require("../Validations/busValidation")
const busController=require("../controller/Admin/busController")
const { fileupload } = require("../middleware/uploads")
const Dashboardcontroller= require("../controller/Admin/Adashboardcontroller");


//bus routes

router.post(
    "/admin/api/v1/registerBus",
    fileupload.array("images"),
    busValidation.busValidationSchema,
    busController.registerBus
)
router.post("/admin/api/v1/updateBusData/:id",busValidation.busValidationSchema,busController.busDataUpdate)
router.delete("/admin/api/v1/deleteBusData/:id",busController.deleteBusData)
router.get("/admin/api/v1/findOneBus/:id",busController.ViewOneBusData)
router.get("/admin/api/v1/viewallbusdata/:id",busController.ViewAllBusData)
router.get("/searchBus/:seller_id", busController.searchBus);
router.get("/api/admin/bussellerbookings",busController.getBusSellerBookings)








//cab routes

//company detail
// router.post("/api/company/cabRegistration",cabCompanyValidation.cabCompanyValidation,cabcompanycontroller.cabRegistration)
// router.post("/api/company/cabLogin",cabcompanycontroller.cabLogin)

//cab detail
router.post("/api/seller/addCab" ,  cabuploads.fields([
    { name: "cabImage", maxCount: 1 },
    { name: "driverImage", maxCount: 1 }
  ]),
cabValidations.cabValidations,cabcontroller.addCab);


router.delete("/api/seller/deleteCab/:id",cabcontroller.deleteCab);
router.get("/api/seller/getCab",cabcontroller.getCab);
router.get("/api/seller/getOnecab",cabcontroller.getOnecab);
router.get("/api/admin/cabsellerbookings",cabcontroller.getCabSellerBookings)

router.get("/api/seller/searchCab",cabcontroller.searchCab);
router.put(
 "/api/seller/updateCab/:id",
 cabuploads.fields([
   {name:"cabImage",maxCount:1},
   {name:"driverImage",maxCount:1}
 ]),
 cabcontroller.updateCab
)





//train routes



//company detail
router.post("/api/company/registration",companydetailvalidation.companyValidation,companydetailrcontroller.SellerRegister)
router.post("/api/company/login",companydetailrcontroller.login)
router.get("/api/company/myProfile",companydetailrcontroller.myProfile)

//train detail
router.post("/api/seller/addTrain",trainvalidations.trainValidations,traincontroller.addTrain);
router.get("/api/seller/getTrain",traincontroller.getTrain);
router.get("/api/seller/singletrain",traincontroller.findTrain);
router.put("/api/seller/updateTrain/:id",traincontroller.editTrain);
router.delete("/api/seller/deleteTrain/:id",traincontroller.deleteTrain);
router.get("/api/seller/searchTrain",traincontroller.searchTrain);
router.get("/api/admin/trainsellerbookings",traincontroller.getTrainSellerBookings)
// router.get("/api/seller/searchroute",.);


// flights routes
router.post("/admin/api/v1/AddFlights", flightvalidation.Addflights, flightcontroller.addflights)
router.put("/admin/api/v1/updateflight/:id", flightvalidation.Addflights, flightcontroller.updateFlights)
router.delete("/admin/api/v1/deleteflight/:id", flightcontroller.deleteFlights)
router.get("/viewOneFlight/:id", flightcontroller.getOneFlight)
router.get("/viewFlight/:id", flightcontroller.getFlight)
router.get("/searchflight", flightcontroller.searchFlight)
// router.post("/sellerRegister",sellerValidation.OwnerValidation,sellerController.SellerRegister)
router.get("/api/admin/flightsellerbookings",flightcontroller.getFlightSellerBookings)

router.get(
  "/api/admin/dashboard",
  Dashboardcontroller.dashboard
);



module.exports = router;
