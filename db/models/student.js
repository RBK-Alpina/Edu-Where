const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let timestampPlugin = require('./plugins/timestamp')

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
  birthday: {
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

  },

  classrooms: [{ type: schema.Type.objectId, ref: "classroom" }]
});

studentSchema.plugin(timestampPlugin)
//function that will hash the password and save it in the student collection
//this function return a promise

const Student = mongoose.model('Student', studentSchema)

async function addNewstudent(student) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(student.password, salt);
  student.password = hashedPassword;
  let student = new Student(student);
  return student.save();
}

async function findStudent(username) {
  const found = await Student.find({ username })
  return found

}
async function modifyStudent(username){
  const modify = await Student.update({ username})
}

module.exports.addNewstudent = addNewstudent;
module.exports.findStudent = findStudent;
