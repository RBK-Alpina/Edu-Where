const mongoose = require("mongoose");

require("dotenv").config();

mongoose.Promise = global.Promise;

<<<<<<< HEAD
mongoose.connect(
  process.env.DATABASE_URL,
=======
mongoose.connect( 'mongodb://localhost:27017/education',
>>>>>>> d460ad0536d069b5ed5d32e5405e2274ee135f62
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
