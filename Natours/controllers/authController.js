const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRETIME,
  });
};
const signUp = async (req, res, next) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

//For Login
const Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1- check if email and password exist
  if (!email && !password) {
    return next(new appError("please provide valid email and password", 400));
  }

  //2-check if user exist and password is correct
  const user = await User.findOne({ email }).select("+password");
  //console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError("incorrect email or password", 401));
  }
  //3- If everything is ok snd token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

const Protect = catchAsync(async (req, res, next) => {
  //1- Getting token and check if its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log("token------->>>>>>>>>>>>>", token);
  }
  if (!token) {
    return next(
      new appError("You are not logged in, please login to get access", 401)
    );
  }
  //2-verify the token with the older signature token--- verify that if no one altered the id that's in the payload  of this token
  const Decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //console.log(Decoded);

  //3-check if user still exists
  const freshUser = await User.findById(Decoded.id);

  //4-check wether the user changed password after the token was issued
  next();
});
module.exports = { signUp, Login, Protect };
