const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (e) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit/:id", userAuth, async (req, res) => {
  const { id } = req.params;
  const loggedInUser = req.user;
  try {
    if (validateEditProfileData(req)) {
      if (loggedInUser._id.toString() !== id) {
        return res
          .status(403)
          .send("Unauthorized: Cannot edit another user's profile");
      }
      Object.keys(req.body).forEach(
        (ele) => (loggedInUser[ele] = req.body[ele])
      );
      await loggedInUser.save();

      res.send({
        message: "User data updated Successfully",
        data: loggedInUser,
      });
    }
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  const loggedInUser = req.user;

  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    Object.keys(req.body).forEach((ele) => (loggedInUser[ele] = passwordHash));
    await loggedInUser.save();
    res.send({
      message: "Password Updated Successfully",
      data: loggedInUser,
    });
  } catch (e) {
    res.status(400).send("Error: " + e.message);
  }
});

module.exports = profileRouter;
