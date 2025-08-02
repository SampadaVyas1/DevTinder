const express = require("express");
const app = express();
// http://localhost:7777/getUserData
app.get("/getUserData", (req, res) => {
    try {
        throw new Error("lkhkjh")
      res.send("User Data Sent");
        
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is Successfully listening on port 7777");
});
