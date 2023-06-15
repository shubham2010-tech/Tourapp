const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const Tour = require("./../../models/tourModel");
dotenv.config();

mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: true,
});
//   .then((con) => {
//     // console.log(con.connection);
//     console.log("connection Db successfull");
//   });

//Read JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//Import Data

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from current database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
