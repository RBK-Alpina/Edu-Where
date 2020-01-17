const mongoose = require('mongoose');
require('../index')
const classRoomSchema = mongoose.Schema({
  name: String,
  description: String,
  categories: String,
  teacher: String,
  students: Array,
  posts: Array
})

let ClassRoom = mongoose.model('ClassRoom', classRoomSchema)

module.exports.create = create = (classRoom) => {
    ClassRoom.create(classRoom)
    .then(res => {
      console.log(res)
      return {
        status: true,
        message: 'the class has been created'
    }
    })
    .catch(err => {
      return {
        status: false,
        message: 'failed to create the class'
      }
    })
}

module.exports.find = find = (objectCriteria, callback = {})=> {
  return ClassRoom.find(objectCriteria)
}

module.exports.addStudent = addStudent = ( classRoomId, studentId )=>{
  ClassRoom.findById({_id: classRoomId})
  .then(res => {
    res.students.push(studentId)
    res.save()
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}

// create({name: 'angular', description: 'learn angular in one day', categories: 'angular', teacher: 'Belkhere', students: ['Essam', 'Ali'], posts: [35,535,255]})

// find().then(res => {
//   console.log(res)
// })

addStudent('5e20d1a709d6444094a35f25', 'sfd')