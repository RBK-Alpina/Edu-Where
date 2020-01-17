const student = require('./student')
const classRoom = require('./classRoom')
require('../index')

const mongoose = require('mongoose')

const studentClassSchema = mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRoom'
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
})

const StudentClass = mongoose.model('StudentClass', studentClassSchema)

module.exports.create = create = (classStudentObj) => {
  return StudentClass.create(classStudentObj)
}

module.exports.find = find = (criteria) => {
  return StudentClass.find(criteria).populate(criteria.student == undefined? 'student': 'class')
}

// create({student: '5e21c328e1fdf83258e74205', class: '5e21c235f1272f316c688076'})

find({student: '5e21c328e1fdf83258e74205'})
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})