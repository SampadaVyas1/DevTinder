const express=require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter=express.Router();

requestsRouter.post("/sendConnectionRequests", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send("Connection Requests Sent!");
  } catch (e) {
    res.send(e);
  }
});

module.exports=requestsRouter;