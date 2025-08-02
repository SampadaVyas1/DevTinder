const express = require("express");
const { authMiddleware,userMiddleware } = require("./middlewares/auth");
const app = express();

app.use("/admin", authMiddleware);

app.get("/user",userMiddleware,(req,res)=>{
    res.send("User")
})

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("delete user");
});

// app.get("/admin/getAllData", (req, res) => {
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (isAdminAuthorized) {
//     res.send("All data sent");
//   } else {
//     res.status(401).send("Unauthorized request");
//   }
// });

app.listen(7777, () => {
  console.log("Server is Successfully listening on port 7777");
});
