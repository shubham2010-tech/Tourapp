const mongoose = require("mongoose");

//We have to explicitly define that we want the virtual properties in our output.

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A tour must have time duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty level"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity: {
    type: Number,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a image cover to show"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: [Date],
});

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// //document middleware: runs before the save() and create command.
// tourSchema.pre("save", function () {
//   //this refers to current instance of documment being saved
// });

// //Query Middleware
// //Allows us to run a funvtion before or after a certain query is executed.
// // tourSchema.pre("find", function (next) {});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;

//So like Express there are also middlewares in Mongoose
//Document,query,aggregate and model middleware
//A document middleware can act on the currently processed middleware.
