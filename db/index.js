const mongoose = require("mongoose");

require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect( 'mongodb://localhost:27017/education',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set("useCreateIndex", true);

var db = mongoose.connection;

db.on("error", function () {
  console.log("mongoose connection error");
});

db.once("open", function () {
  console.log("mongoose connected successfully");
});

exports.db = db;
