const express = require("express");
const app = express();

// http://localhost:7777/user?userId=101
// http://localhost:7777/user?userId=101&passoword=33
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});

// http://localhost:7777/user/707
app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Akshay", lastName: "Saini" });
});


app.get("/user/:userId/:name", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Akshay",  });
});

app.listen(7777, () => {
  console.log("Server is Successfully listening on port 7777");
});
