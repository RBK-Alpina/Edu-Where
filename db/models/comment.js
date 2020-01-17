require('../index')
const mongoose = require('mongoose')
const _post = require('./post')

const commmentSchema = mongoose.Schema({
  text: String,
  student: String,
  date: Date
})

const Comment = mongoose.model('Comment', commmentSchema)

module.exports.create = create = (comment, postId) => {
  return Comment.create(comment)
  .then(res => {
    return _post._addComment(res._id, postId)
  })
}

create({text: 'you did greate job, thank you', student: 'Essam', date: new Date}, '5e21859aa14a08370c69064a')
.then(res => {
  console.log(res)
})
.catch(err => {
  console.log(err)
})