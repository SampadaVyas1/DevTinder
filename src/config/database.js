const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sampadavyas1:wwiNaPpDAfRSo4aZ@namastenode.j6buyvt.mongodb.net/devTinder"
  );
};

module.exports=connectDB
