const express = require("express");
const app = express();

// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("1");
//     res.send({ firstName: "Akshay", lastName: "Saini" });
//     next();
//   },
//   (req, res) => {
//     console.log("2");
//     res.send("2nd Response");
//   }
// );
//new
app.get("/user", [
  (req, res, next) => {
    console.log("1");
    next();
    // res.send({ firstName: "Akshay", lastName: "Saini" });
  },
  (req, res, next) => {
    console.log("2");
    next();
    // res.send("2nd Response");
  },
  (req, res, next) => {
    console.log("3");
    next();
    // res.send("2nd Response");
  },
  (req, res, next) => {
    console.log("4");
    // next();
    // res.send("2nd Response");
  },
]);
//Cannot GET /user

app.listen(7777, () => {
  console.log("Server is Successfully listening on port 7777");
});
