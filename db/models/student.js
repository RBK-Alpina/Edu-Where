var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
let timestampPlugin = require('../models/timestamp')
require ('../index')
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

// async function findStudent(username) {
//   const found = await Student.find({ username })
//   return Student.findOne({ username });

// }
const findStudent = async (username) => {
  return Student.findOne({ username });
};
async function modifyStudent(username){
  const modify = await Student.update({ username})
}

module.exports.addNewstudent = addNewstudent;
module.exports.findStudent = findStudent;
module.exports.modifyStudent = modifyStudent;



// console.log(addNewstudent({username:"Hamam", email: "hamam@gmail.com",password : "****",birthday: "11/1/1111", firstName: "HAmam",lastName: "Elmuratdh"}))
findStudent('Hamam').then(res=>{
  console.log(res)
})
// console.log( findStudent('Hamam'))