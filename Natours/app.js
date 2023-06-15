const express = require("express");
const morgan = require("morgan");

//importing the routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//What is the use of middleware:- In exress when someone hits the serverv a re and res objects initiates, that data will then be processed in order to  generate and send back a meaningfull response, to process that data we use middleware
//a middleware to handle post request
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(express.json());
}

app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("hello from the middleware");
  next();
});

//Route for tours.

// tourRouter.route("/").get(getalltour).post(addtour);

//as we know that middleware executes in order and completes a request response cycle.
// the routes also act as a middleware so the route will itself completes the req-res cycle and hence now this middleware function will not be executed.
//And also if a middleware comes between middleware stack then it will get executes as it will be the part of that req-res cycle.

// app.use((req, res, next) => {
//     console.log("hello from the middleware");
//     next();
//   });

// tourRouter.route("/:id").get(gettourbyid).patch(updatetour).delete(deletetour);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
