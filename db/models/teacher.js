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
  birthday: {
    required: true,
    type: Date
  },
  username: {
    required: true,
    type: String
  },
  classrooms: [{ type: Schema.Types.ObjectId, ref: "Classroom" }]
});

let Teacher = mongoose.model("Teacher", teacherSchema);

const saveTeacher = async (teacher) => {//teacher is object contain all necessary data :firstname,password..
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(teacher.password, salt);
  let newTeacher = new Teacher(teacher);
  return newTeacher.save();
};

const findTeacher = (email) => {
  return Teacher.findOne({ email }).then(teacher => teacher);
};

const updateTeacherClassroom = (idteacher, idClassroom) => {
  Product.findOneAndUpdate(
    { _id: idteacher },
    {
      $push: { classrooms: idClassroom }
    },
    { new: true }
  ).then((teacher => teacher))
}
}

module.exports.saveTeacher = saveTeacher;
module.exports.findTeacher = findTeacher;
modul.exports.ClassroomupdateTeacherClassroom = updateTeacherClassroom
