require('../index')
const mongoose = require('mongoose');
const _classRoom = require('./classRoom')

const postSchema = mongoose.Schema({
  text: String,
  teacher: mongoose.Schema.Types.ObjectId,
  date: Date,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

const Post = mongoose.model('Post', postSchema);

module.exports.create = create = (post, classRoomId) => {
  return (Post.create(post)
  .then(res => {
    return _classRoom._addPost(classRoomId, res._id)
  })
  .catch(err => {
    return err;
  }))
}


module.exports._addComment = (commentId, postId) => {
  return Post.findByIdAndUpdate(
    postId,
    {
      $push: {comments: commentId}
    },
    {new: true}
  )
}
// create({text: "that's very good you did greate gob", teacher: '5e2184e79ca8d2248cdce16f' , date: new Date()}, '5e2181fcf74fe244c0e18cc0')
// .then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })