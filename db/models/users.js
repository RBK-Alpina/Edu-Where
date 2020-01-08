const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = mongoose.Schema({
  username: {
    unique: true,
    required: true,
    type: String
  },
  password: String
});

let User = mongoose.model("User", userSchema);
