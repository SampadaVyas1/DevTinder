const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectRequestsModel = require("../models/connectionRequest");
const User = require("../models/user");

const requestsRouter = express.Router();

requestsRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const allowedStatus = ["ignored", "interested"];
      const fromUserId = req.user._id;
      const toUserId = req.params?.userId;
      const status = req.params.status;
      if (!allowedStatus.includes(status)) {
        return res.send({ message: "Invalid status type" });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).send({ message: "User Does not Exsist" });
      }

      const existingConnectionRequests = await connectRequestsModel?.findOne({
        $or: [
          { fromUserId, toUserId },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if (existingConnectionRequests) {
        return res
          .status(400)
          .json({ message: "Connection request already exists" });
      }
      const connectRequests = new connectRequestsModel({
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      });
      const data = await connectRequests.save();
      res.send({ data: data, message: req.user.firstName + " is " + status + " in " +toUser.firstName });
    } catch (e) {
      res.status(400).send({ message: e.message || "Something went wrong" });
    }
  }
);

module.exports = requestsRouter;
