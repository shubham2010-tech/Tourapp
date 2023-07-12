// const fs = require("fs");
const Tour = require("./../models/tourModel");
const apiFeatures = require("./../utils/apiFeatures");
const appError = require("../utils/appError");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//I am skipping the lecture no. 100 which is a feature of selecting some cheapest tours by sorting.
//We are creating a new object of the APIfeatures class in there we are passing a query object and query string that is coming from express
//To get all data in tour
const getalltour = async (req, res) => {
  try {
    //Execute Query
    //Remeber all of this chaining works only because after calling each of this methods, we are returning this and this is the object itself which hss access to each of these methods here making it possible to chain them.
    const features = new apiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagination();
    const tours = await features.query;
    //Send Response
    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

//To get tour by id
const gettourbyid = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return next(new appError("No tour found with that id", 404));
    }
    //Tour.findone({_id: req.params.id}) will work same as findbyid
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "no data",
    });
  }
  //console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
};

//to add a tour in tour data
const addtour = async (req, res) => {
  try {
    const newtour = await Tour.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        tour: newtour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};
const updatetour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "err",
    });
  }
};
//to delete tour data
const deletetour = async (req, res) => {
  try {
    //Here we are notv saving any data to a const because in restful api it is a common practice not to return any data to client while deleting anything.
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "deleted",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

//Making an aggregation pipeline:- its an mongodb feature

const gettourStats = async (req, res) => {
  //due to spelling mistake the calculation was not working.
  try {
    //The basic idea of aggreagation here is to define a pipeline that all documents from acertain collection go through where they are processed step by step in order to transform them into aggregated result.
    const stats = await Tour.aggregate([
      //match - to select or filter certain documents
      {
        $match: { ratingAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: "$difficulty",
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingQuantity" },
          avgRating: { $avg: "$ratingAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: {
        stats: stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

const getMonthlyplan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        //what unwind will do is basically deconstruct an array field from the info documents and then output one document for each element of the array.
        //here we want one tour for each of these dates in the array.
        $unwind: "$startDate",
      },
      {
        $match: {
          startDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

module.exports = {
  deletetour,
  addtour,
  updatetour,
  getalltour,
  gettourbyid,
  gettourStats,
  getMonthlyplan,
};
