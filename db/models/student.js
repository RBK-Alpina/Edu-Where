var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let timestampPlugin = require('../models/timestamp')
require('../index')
const Schema = mongoose.Schema
const studentSchema = mongoose.Schema({
  firstName: {
    // required: true,
    type: String
  },
  lastName: {
    // required: true,
    type: String
  },
  email: {
    //unique: true,
    // required: true,
    type: String
  },
  birthday: {
    // required: true,
    type: Date
  },
  password: {
    // required: true,
    type: String
  },
  username: {
    // required: true,
    type: String,

  },

  classrooms: [{ type: Schema.Types.ObjectId, ref: "Classroom" }]
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
async function modifyStudent(idstudent, idClassroom) {
  const modify = await Student.update(
    { _id: idstudent },
    {
      $push: { classrooms: idClassroom }
    },
    { new: true }
  )

}

module.exports.addNewstudent = addNewstudent;
module.exports.findStudent = findStudent;
module.exports.modifyStudent = modifyStudent;

/// testing
// modifyStudent('Hamam')
// findStudent('Hamam').then(res => {
//   console.log(res)
// })
