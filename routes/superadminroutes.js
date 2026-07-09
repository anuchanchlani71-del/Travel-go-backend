const express = require("express");
const router = express.Router();

const superAdminController = require("../controller/superAdmin/superadmincontroller");
const Dashboardcontroller = require("../controller/superAdmin/dashboardController");
const { destinationUpload} = require("../middleware/uploads");
const destinationController = require("../controller/admin/destinationController");
// Users
router.get("/superadmin/users", superAdminController.getAllUsers);

// Sellers
router.get("/superadmin/sellers", superAdminController.getAllSellers);


router.get("/superadmin/trainbooking", superAdminController.getAllTrainBookings);

router.get("/superadmin/cabbooking", superAdminController.getAllCabBookings);
router.get("/superadmin/flightbooking", superAdminController.getAllFlightBookings);
router.get("/superadmin/busbooking", superAdminController.getAllBusBookings);
router.post("/superadmin/login", superAdminController.superAdminLogin);
router.get("/superadmin/my-profile", superAdminController.superAdminProfile);
router.put("/superadmin/update-user-status/:id", superAdminController.updateUserStatus);
router.put("/superadmin/update-seller-status/:id", superAdminController.updateSellerStatus);
router.put("/superadmin/update-booking-status/:id", superAdminController.updateBookingStatus);



// ===============================
// 🌍 POPULAR DESTINATIONS ROUTES
// ===============================


// ADD DESTINATION (CREATE)


router.post(
  "/api/add-destination",
destinationUpload.single("image"),
  destinationController.addDestination
);

// GET ALL DESTINATIONS (READ)
router.get(
  "/api/get-destinations",
 destinationController.getPopularDestinations
);


// UPDATE DESTINATION
router.put(
  "/api/update-destination/:id",
  destinationUpload.single("image"),
  destinationController.updateDestination
);


// DELETE DESTINATION
router.delete(
  "/api/delete-destination/:id",
  destinationController.deleteDestination
);
router.get(
  "/api/get-destination/:id",
  destinationController.getDestinationById
);






router.get(
  "/superadmin/dashboard",
  Dashboardcontroller.superAdminDashboard
);

module.exports = router;