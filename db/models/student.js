var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let timestampPlugin = require('../models/timestamp')
let test = require('./studentClass')

require('../index')
const Schema = mongoose.Schema
const studentSchema = mongoose.Schema({
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
  birthdate: {
    required: true,
    type: Date
  },
  password: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String,
  }
});

studentSchema.plugin(timestampPlugin)
//function that will hash the password and save it in the student collection
//this function return a promise

const Student = mongoose.model('Student', studentSchema)

async function addNewstudent(student) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(student.password, salt);
  student.password = hashedPassword;
  let newStudent = new Student(student);
  return newStudent.save();
}

const findStudent = async (username) => {
  return Student.findOne({ username });
};
// async function addClassRoom(idstudent, idClassroom) {
//   const modify = await Student.update(
//     { _id: idstudent },
//     {
//       $push: { classrooms: idClassroom }
//     },
//     { new: true }
//   )

// }

module.exports.addNewstudent = addNewstudent;
module.exports.findStudent = findStudent;
// module.exports.addClassRoom = addClassRoom;

/// testing
// modifyStudent('Hamam')
// findStudent('Hamam').then(res => {
//   console.log(res)
// })



// addNewstudent({firstName: 'Mehdi', lastName: 'farg', email: 'mehdi@gmail.com', birthday: new Date(1995, 4, 25), username: 'mehdi', password: '13131313'})
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })