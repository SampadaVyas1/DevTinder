const express=require("express");
const { validateSignUpData, validateEmailData } = require("../utils/validation");
const authRouter=express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ emailId: req.body.emailId });
  if (existingUser) {
    return res.send("User with duplicate email found");
  }

  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(500).send(err?.message, "Error Saving the user");
  }
});


authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    validateEmailData(emailId);

    const userData = await User.findOne({ emailId });
    if (!userData) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await userData.validatePassword(password);
    if (isPasswordValid) {
      const token =await userData.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 + 3600000),
      });
      res.send("Login Successfully");
    }
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    res.send(e + " Login failed");
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token",null,{
    expires:new Date(Date.now())
  }).send("Logout Successfully")
});
module.exports=authRouter;