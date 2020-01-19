const student = require("./student");
const classRoom = require("./classRoom");
require("../index");

const mongoose = require("mongoose");

const studentClassSchema = mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ClassRoom"
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  }
});

const StudentClass = mongoose.model("StudentClass", studentClassSchema);

module.exports.create = create = classStudentObj => {
  return StudentClass.create(classStudentObj);
};

module.exports.find = find = criteria => {
  return StudentClass.find(criteria);
};

module.exports.check = check = criteria => {
  return StudentClass.exists(criteria);
};
// check({
//   student: "5e245fed54b0d513c8639415",
//   class: "5e2451612765fc2b647ca701"
// }).then(res => {
//   console.log(res);
// });
// find({ student: "5e21c328e1fdf83258e74205" })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// find({
//   class: "5e245148d308931e94d95085"
// })
//   .populate("student")
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
