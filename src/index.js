const express = require("express");
const connectDB = require("./config/database");
const User=require("./models/user");
const app = express();
// const bodyParser = require('body-parser')
// app.use(bodyParser.json()); 
app.use(express.json()); 

app.post("/signup", async(req, res) => {
 const userData= req.body;
  // const userObj = {
  //   firstName: "Akshay",
  //   lastName: "saini",
  //   emailId: "aksahy@saini.com",
  //   password: "akshat@123",
  // };
  console.log(userData,"userData")
  try{
    
    const user=new User(userData)
    await user.save();
    res.send("User Saved Successfully")
  }
  catch(err)
  {
    res.status(500).send("Error Saving the user")
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
