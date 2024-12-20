// node and express core imports
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
// third party packages
const cors = require("cors");
const helmet = require("helmet");

// local imports
const AppError = require("./utils/appError");
const userRouter = require("./router/userrouter");
const adminRouter = require("./router/adminRouter");
const globalRouter = require("./router/handlerRouter");
const globalErrorHandler = require("./controllers/errorController");

// Initialize the app
const app = express();

// setup necessary middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
//app.use(express.static(process.cwd() + "/Frontend/build/"));

const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
app.use(express.static(process.cwd() + "/GIASCHOOL/dist/"));

// routers

//GIA-FORMS
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/global", globalRouter);

app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/GIASCHOOL/dist/index.html");
});

// health check route
app.get("/health", (req, res) => {
  res.send("API server up");
});

//Socket
app.use((req, res, next) => {
  req.io = io;
  next();
});
// app.set("socketio", io);

// handling not found route
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// global error handler
app.use(globalErrorHandler);

/*
Extras

error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

module.exports = httpServer;
