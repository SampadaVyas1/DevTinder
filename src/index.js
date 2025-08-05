const express = require("express");
const connectDB = require("./config/database");
const { validateSignUpData, validateEmailData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    validateEmailData(emailId);

    const userData = await User.findOne({ emailId });
    if (!userData) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, userData?.password);
    console.log(userData, isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    res.send("Login Successfully");
  } catch (e) {
    res.send(e+" Login failed");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req?.params?.userId;
  const data = req.body;
  const ALLOWED_DATA = ["photoUrl", "about", "gender", "age", "skills"];
  const isUpdateAllowed = Object.keys(data).every((key) =>
    ALLOWED_DATA.includes(key)
  );
  if (data?.skills?.length > 10) {
    throw new Error("Skills Length exceeded");
  }
  try {
    if (isUpdateAllowed) {
      user = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
      res.send(user);
    } else {
      res.send("Fields are not allowed to update");
    }
  } catch (e) {
    res.status(400).send(e?.message, "Something went Wrong");
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

  const existingUser = await User.findOne({ emailId: req.body.emailId });
  console.log(existingUser, "existingUser");
  if (existingUser) {
    return res.send("User with duplicate email found");
  }

  console.log(userData, "userData");
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
