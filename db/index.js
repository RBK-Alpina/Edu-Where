const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://maher:${process.env.PSW}@cluster0-ztajo.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useCreateIndex", true);

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

exports.db = db;
