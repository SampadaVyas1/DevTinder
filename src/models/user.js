const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 5, maxLength: 50 },
  lastName: { type: String },
  emailId: {
    type: String,
    lowerCase: true,
    trim: true,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
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
  },
  about: {
    type: String,
    default: "This is a default info of the user",
  },
},{
  timestamps:true
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
