const mongoose = require('mongoose');

const classRoomSchema = mongoose.Schema({
  name: String,
  description: String,
  categories: String,
  students: Array,
  teacher: String,
  posts: Array
})

let ClassRoom = mongoose.model('ClassRoom', classRoomSchema)

classRoom.