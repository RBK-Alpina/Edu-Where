const mongoose = require("mongoose");

require("dotenv").config();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://essam:7nW0jQduNEIhhwEY@cluster0-cno1u.mongodb.net/test?retryWrites=true&w=majority",
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
