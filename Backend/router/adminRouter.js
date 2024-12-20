const express = require("express");
const multer = require("multer");

const authController = require("../controllers/admin/authController");
const dataController = require("../controllers/admin/admindataController");
const { body, validationResult } = require("express-validator");
//const admindataController = require("../controllers/admin/admindataController");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

//auth endpoints
router.post(
  "/login/request",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 8 }),
  ],
  authController.loginRequest
);
router.post("/login/verify", authController.loginVerify);
router.post(
  "/login/signUp",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is too short").isLength({ min: 8 }),
  ],
  authController.signUp
);
router.get("/logout", authController.logout);

router.use(authController.protect);

//Trip types
router.get("/data/getTripTypes", dataController.getTripTypes);
router.post("/data/inserTripTypes", dataController.inserTripTypes);
router.post("/data/updateTripTypes", dataController.updateTripTypes);

//Members List
router.get("/data/getMembersList", dataController.getMembersList);
router.post("/data/insertMembersList", dataController.insertMembersList);
router.post("/data/updateMembersList", dataController.updateMembersList);

//Trips
router.get("/data/getTrips", dataController.getTrips);
router.post("/data/insertMembersList", dataController.insertMembersList);
router.post("/data/updateMembersList", dataController.updateMembersList);

//Bookings
router.get("/data/getUserTravelBookings", dataController.getUserTravelBookings);
router.post(
  "/data/insertUserTravelBookings",
  dataController.insertUserTravelBookings
);
router.post(
  "/data/updateUserTravelBookings",
  dataController.updateUserTravelBookings
);

//Payments
router.get("/data/getPayments", dataController.getPayments);
router.post("/data/insertPayments", dataController.insertPayments);
router.post("/data/updatePayments", dataController.updatePayments);

//Announcements
router.get("/data/getAnnouncements", dataController.getAnnouncements);
router.post("/data/insertAnnouncements", dataController.insertAnnouncements);
router.post("/data/updateAnnouncements", dataController.updateAnnouncements);

module.exports = router;
