const Comment = require('../db/models/comment')


module.exports.addComment = addComment = (comment, postId) => {
  return Comment.create(comment, postId)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
}


// addComment({text: 'ah you can do better than it', student: 'Mehdi', date: new Date()}, '5e21859aa14a08370c69064a')

