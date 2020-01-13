const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  }
});

let User = mongoose.model("User", userSchema);

//function that will hash the password and save it in the users collection
//this function return a promise
const saveUser = async (firstName, lastName, email, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  let user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword
  });
  return user.save();
};

//functio that will check if the user is already registred in the database or not
//and check if the password is valid
//this function return an object if the password match or false if the password dosen't match
const findUser = (email, password) => {
  return User.findOne({ email }).then(async user => {
    if (user) {
      let pswd = await bcrypt.compare(password, user.password);
      return { found: pswd, user };
    } else {
      return false;
    }
  });
};

module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
