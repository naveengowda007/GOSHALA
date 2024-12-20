const express = require("express");
const multer = require("multer");
const authController = require("../controllers/usrers/authController");
const dataController = require("../controllers/usrers/userDataControllers");
const { body, validationResult } = require("express-validator");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

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

// protect middleware
router.use(authController.protect);

//Trip types
router.get("/data/getTripTypes", dataController.getTripTypes);

//Members List
router.get("/data/getMembersList", dataController.getMembersList);
router.post("/data/insertMembersList", dataController.insertMembersList);
router.post("/data/updateMembersList", dataController.updateMembersList);

//Trips
router.get("/data/getTrips", dataController.getTrips);

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

//Announcements
router.get("/data/getAnnouncements", dataController.getAnnouncements);

module.exports = router;
