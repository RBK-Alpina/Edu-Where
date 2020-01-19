const StudentClass = require("../db/models/studentClass");

module.exports.enroll = enroll = (studentId, classId) => {
  return StudentClass.create({ student: studentId, class: classId });
};

module.exports.getStudentsOfClass = getStudentsOfClass = classId => {
  return StudentClass.find({ class: classId })
    .populate("student")
    .lean()
    .then(res => {
      let students = res.map(studentObj => {
        return studentObj.student;
      });
      return students;
    });
};

module.exports.getClassesOfStudent = getClassesOfStudent = studentId => {
  return StudentClass.find({ student: studentId })
    .populate("class")
    .lean()
    .then(res => {
      let classes = res.map(classObj => {
        return classObj.class;
      });
      return classes;
    });
};

getStudentsOfClass("5e245148d308931e94d95085")
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// getClassesOfStudent("5e24503100e7822424bbac64").then(res => {
//   console.log(res);
// });
