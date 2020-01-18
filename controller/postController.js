const Post = require('../db/models/post')

module.exports.addPost = addPost = (post, classRoomId) => {
  return Post.create(post, classRoomId)
}


