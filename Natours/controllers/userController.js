const getallusers = (req, res) => {
  res.status(500).json({
    status: "fail",
    message: "not defined the users ",
  });
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
