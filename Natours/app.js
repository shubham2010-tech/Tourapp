const express = require("express");
const morgan = require("morgan");
const appError = require("./utils/appError");
const globalErrorhandler = require("./controllers/errorController");
//importing the routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//What is the use of middleware:- In exress when someone hits the serverv a req and res objects initiates, that data will then be processed in order to  generate and send back a meaningfull response, to process that data we use middleware
//a middleware to handle post request
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(express.json());
}

// app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  console.log("hello from the middleware");
  next();
});

//Route for tours.

// tourRouter.route("/").get(getalltour).post(addtour);

//as we know that middleware executes in order and completes a request response cycle.
// the routes also act as a middleware so the route will itself completes the req-res cycle and hence now this middleware function will not be executed.
//And also if a middleware comes between middleware stack then it will get executes as it will be the part of that req-res cycle.

// tourRouter.route("/:id").get(gettourbyid).patch(updatetour).delete(deletetour);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new appError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorhandler);
module.exports = app;
