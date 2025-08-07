const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      match: [
        /^[a-zA-Z\s]+$/,
        "First name should contain only letters and spaces",
      ],
    },
    lastName: {
      type: String,
      trim: true,
      match: [
        /^[a-zA-Z\s]*$/,
        "Last name should contain only letters and spaces",
      ],
    },
    emailId: {
      type: String,
      lowerCase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [128, "Password can't exceed 128 characters"],
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    skills: { type: [String] },
    photoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fprofile&psig=AOvVaw292UZ_Y068QjuGT24fGIy4&ust=1754333354452000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKC2hsCn744DFQAAAAAdAAAAABAW",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL" + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default info of the user",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "1d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (password) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(password, user?.password);
  return isPasswordValid;
};



const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
