const User = require("../models/userModel");
const getallusers = async (req, res, next) => {
  try {
    const users = await User.find();
    //Send Response
    res.status(200).json({
      status: "success",
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const getuserbyid = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "not defined the users ",
  });
};
const adduser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "not defined the users ",
  });
};
const updateuser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "not defined the users ",
  });
};
const deleteuser = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "not defined the users ",
  });
};

module.exports = { deleteuser, adduser, getallusers, updateuser, getuserbyid };
