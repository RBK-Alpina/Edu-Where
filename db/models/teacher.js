const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teacherSchema = mongoose.Schema({
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

let Teacher = mongoose.model("Teacher ", teacherSchema);

//function that will hash the password and save it in the users collection
//this function return a promise
const saveTeacher = async (firstName, lastName, email, password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  let teacher= new Teacher({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword
  });
  return teacher.save();
};

//functio that will check if the user is already registred in the database or not
//and check if the password is valid
//this function return an object if the password match or false if the password dosen't match
const findTeacher = (email, password) => {
  return Teacher.findOne({ email }).then(async teacher => {
    if (teacher) {
      let pswd = await bcrypt.compare(password, teacher.password);
      return { found: pswd, teacher };
    } else {
      return false;
    }
  });
};

module.exports.saveTeacher = saveTeacher;
module.exports.findTeacher = findTeacher;