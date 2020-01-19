const classRoom = require('../db/models/classRoom')
const teacher = require('../db/models/teacher')


module.exports.getClasses = getClasses = async () => {
  return classRoom.find().lean()
    .then(res => {
      let modifiedClasses = res.map((classRoom) => {
        delete classRoom.posts
        return classRoom
      })
      return new Response(true, modifiedClasses)
    })
    .catch(err => {
      new Response(false, err)
    })
}

module.exports.getClassById = getClassById = async (classId) => {
  return classRoom.find({ _id: classId })
    .then(res => {
      return new Response(true, res[0])
    })
    .catch(err => {
      return new Response(false, err)
    })
}

module.exports.addClass = addClass = (classObj) => {
  return classRoom.create(classObj)
    .then(res => {
      return teacher.updateTeacherClassroom(classObj.teacher, res._id)
        .then((result) => {
          return {
            status: true,
            message: 'the class has been created'
          }
        })

    })
    .catch(err => {
      return {
        status: false,
        message: 'failed to create the class'
      }
    })
}

class Response {
  constructor(status, response) {
    if (status) {
      this.status = status;
      this.data = response;
    } else {
      this.status = status;
      this.err = response
    }
  }
}

// addClass({ name: 'testclass' })
// console.log(getClasses())
