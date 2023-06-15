const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
const app = require("./app");
//mongodb+srv://shubhams200120:Shubham2010@cluster0.donrgn7.mongodb.net/?tls=true.
//console.log(process.env.DATABASE);
mongoose
  .connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then((con) => {
    // console.log(con.connection);
    console.log("connection Db successfull");
  });

// const testTour = new Tour({
//   name: "test",
//   rating: 5,
//   price: 1000,
// });

// testTour.save();
// To start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}....`);
});
