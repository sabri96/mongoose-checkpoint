const { Mongoose } = require("mongoose");

const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGOURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoose is connected"))
    .catch(() => console.log("Error"));
};
module.exports = connectDB;