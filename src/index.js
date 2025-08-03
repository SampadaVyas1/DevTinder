const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.patch("/user", async (req, res) => {
  const data = req.body;
  try {
    user = await User.findByIdAndUpdate(data.userId, data, {
      returnDocument: "after",
      runValidators:true,
    });
    res.send(user);
  } catch (e) {
    res.status(400).send(e?.message,"Something went Wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.send("User not found");
    }
    res.send("User Deleted Successfully");
  } catch (e) {
    res.status(400).send("Something went Wrong");
  }
});

app.use("/user", async (req, res) => {
  const emailId = req.body?.emailId;
  try {
    const user = await User.findOne({ emailId });
    if (user.length == 0) {
      res.send(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(400).send("Something went Wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.send("No data found");
    } else {
      res.send(users);
    }
  } catch (e) {
    res.status(400).send("Something went Wrong");
  }
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  // const userObj = {
  //   firstName: "Akshay",
  //   lastName: "saini",
  //   emailId: "aksahy@saini.com",
  //   password: "akshat@123",
  // };

  const existingUser =await User.findOne({ emailId: req.body.emailId });
  console.log(existingUser,"existingUser")
  if (existingUser) {
   return res.send("User with duplicate email found");
  }

  console.log(userData, "userData");
  try {
    const user = new User(userData);
    await user.save();
    res.send("User Saved Successfully");
  } catch (err) {
    res.status(500).send(err?.message,"Error Saving the user");
  }
});

connectDB()
  .then(() => {
    console.log("Database connect is successful");
    app.listen(7777, () => {
      console.log("Server is Successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.log(err, "Database cannot be connected ");
  });
