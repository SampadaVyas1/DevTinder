const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }
    const decoded = jwt.verify(token, "DEV@Tinder$790"); 
    const userProfile = await User.findById(decoded._id);
    if (!userProfile) {
      throw new Error("User not found");
    }
    req.user=userProfile;
    next();
  } catch (e) {
    res.status(401).send("Error" + e);
  }
};

module.exports = {
  userAuth,
};
