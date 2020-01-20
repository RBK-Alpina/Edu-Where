require('../index')
const mongoose = require('mongoose')
const _post = require('./post')
const Student = require('./student')

const commmentSchema = mongoose.Schema({
  text: String,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  date: Date
})

const Comment = mongoose.model('Comment', commmentSchema)

module.exports.create = create = async (comment, postId, callback) => {
  Comment.create(comment)
  .then(res => {
    //console.log('comment id ----->', res._id)
    _post._addComment(res._id, postId)
    Student.find(res.student)
    .then(student => {
      console.log(student)
      res.student = student;
      callback(res)
    })
  })
}

// create({text: 'you did greate job, thank you', student: 'Essam', date: new Date}, '5e21859aa14a08370c69064a')
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })