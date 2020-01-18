const StudentClass = require('../db/models/studentClass')


module.exports.enroll = enroll = (studentId, classId) => {
  return StudentClass.create({student: studentId, class: classId})
}


module.exports.getStudentsOfClass = getStudentsOfClass = (classId) => {
  return StudentClass.find({class: classId}).lean()
  .then(res => {
    let students = res.map(studentObj => {
      return studentObj.student
    })
    return students
  })
}

module.exports.getClassesOfStudent = getClassesOfStudent = (studentId) => {
  return StudentClass.find({student: studentId}).lean()
  .then(res => {
    let classes = res.map(classObj => {
      return classObj.class
    })
    return classes
  })
}

// getStudentsOfClass('5e22db03d01f90185cae0b52')
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })