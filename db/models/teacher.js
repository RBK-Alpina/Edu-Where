const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const teacherSchema = mongoose.Schema({
  firstName: {
    // required: true,
    type: String
  },
  lastName: {
    // required: true,
    type: String
  },
  email: {
    //  unique: true,
    // required: true,
    type: String
  },
  password: {
    // required: true,
    type: String
  },
  birthday: {
    // required: true,
    type: Date
  },
  username: {
    // required: true,
    type: String
  },
  classRooms: [{ type: Schema.Types.ObjectId, ref: "ClassRoom" }]
});

let Teacher = mongoose.model("Teacher", teacherSchema);

const saveTeacher = async (teacher) => {//teacher is object contain all necessary data :firstname,password..
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(teacher.password, salt);
  teacher.password = hashedPassword
  let newTeacher = new Teacher(teacher);

  return newTeacher.save();
};

const findTeacher = (username) => {
  return Teacher.findOne({ username });
};

const updateTeacherClassroom = async (idteacher, idClassroom) => {
  var teacher = await Teacher.findOneAndUpdate(
    { _id: idteacher },
    {
      $push: { classrooms: idClassroom }
    },
    { new: true }
  )
  return teacher;
}




module.exports.saveTeacher = saveTeacher;
module.exports.findTeacher = findTeacher;
module.exports.updateTeacherClassroom = updateTeacherClassroom
