const mongoose = require('mongoose');
require('../index')
const test = require('./studentClass')

const classRoomSchema = mongoose.Schema({
  name: String,
  description: String,
  categories: String,
  teacher: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
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

  // .then(res => {
  //   res.students.push(studentId)
  //   res.save()
  //   console.log(res)
  // })
  // .catch(err => {
  //   console.log(err)
  // })
// }

module.exports._addPost = addPost = (classRoomId, postId)=> {
  return ClassRoom.findByIdAndUpdate(
    classRoomId,
    {
      $push: {posts: postId}
    },
    {new: true}
  )
}


// create({name: 'react', description: 'learn react in one day', categories: 'react', teacher: 'Essam'})

// find().then(res => {
//   console.log(res)
// })
// test.find({student: '5e21c328e1fdf83258e74205'})
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })