// node and express imports
const { promisify } = require("util");

// local imports
const db = require("../../database/db");
const AppError = require("../../utils/appError");
const catchAsyncError = require("../../utils/catchAsyncError");
const getData = require("../../database/dbquerieshandlers");
const uploadfile = require("../../middlewares/s3bucket");
const {
  generateInsertStatement,
  generateUpdateStatement,
} = require("../../database/sqlStatementGenarator");

//Trip Types
exports.getTripTypes = catchAsyncError(async (req, res, next) => {
  getData(req, res, "trip_types");
});

exports.inserTripTypes = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("trip_types", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateTripTypes = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("trip_types", req, "trip_type_id");
  res.status(200).send({ message: "Request submitted" });
});

//Members List
exports.getMembersList = catchAsyncError(async (req, res, next) => {
  getData(req, res, "members_list");
});

exports.insertMembersList = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("members_list", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateMembersList = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("members_list", req, "member_id");
  res.status(200).send({ message: "Request submitted" });
});

//Trips
exports.getTrips = catchAsyncError(async (req, res, next) => {
  getData(req, res, "trips");
});

exports.inserTrips = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("trips", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateTrips = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("trips", req, "trip_id");
  res.status(200).send({ message: "Request submitted" });
});

//Travel Bookings
exports.getUserTravelBookings = catchAsyncError(async (req, res, next) => {
  getData(req, res, "user_travel_bookings");
});

exports.insertUserTravelBookings = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("user_travel_bookings", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateUserTravelBookings = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("user_travel_bookings", req, "booking_id");
  res.status(200).send({ message: "Services Saved" });
});

//Payments
exports.getPayments = catchAsyncError(async (req, res, next) => {
  getData(req, res, "payments");
});

exports.insertPayments = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("payments", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updatePayments = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("payments", req, "payment_id");
  res.status(200).send({ message: "Services Saved" });
});

//Announcements
exports.getAnnouncements = catchAsyncError(async (req, res, next) => {
  getData(req, res, "announcements");
});

exports.insertAnnouncements = catchAsyncError(async (req, res, next) => {
  await generateInsertStatement("announcements", req);
  res.status(200).send({ message: "Request submitted" });
});

exports.updateAnnouncements = catchAsyncError(async (req, res, next) => {
  await generateUpdateStatement("announcements", req, "announcement_id");
  res.status(200).send({ message: "Services Saved" });
});
