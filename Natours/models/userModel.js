const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not same",
    },
  },
});

//pre-save middleware
//runs between getting the data and saving it to the database.
//hash or hashing means encrypting any data to not to show as a plain readable text which is confidential.

userSchema.pre("save", async function (next) {
  //this will run before save method runs on our model and runs only when the password is modified
  if (!this.isModified("password")) return next();

  //now we are going to do the encryption using a very well known and very popular hashing algorithm using bcrypt.
  this.password = await bcrypt.hash(this.password, 12);

  //delete confirmpassword field not to persist in the database
  this.confirmPassword = undefined;
  next();
});

//Instance method
//It is a method that is gonna available on all documents of a certain collection
userSchema.methods.correctPassword = async function (
  candidatepassword,
  userPassword
) {
  return await bcrypt.compare(candidatepassword, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
