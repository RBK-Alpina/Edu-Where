const classRoom = require('../db/models/classRoom')


module.exports.getClasses = getClasses = async ()=> {
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
  return classRoom.find({_id: classId})
  .then(res => {
    return new Response( true, res[0])
  })
  .catch(err => {
    return new Response( false, err)
  })
}


module.exports.addClass = addClass = async (classObj) {
  return classRoom.create(classObj)
  .then(res => {
    return new Response(true, res)
  })
  .catch(err => {
    return new Response(false, err)
  })
}


class Response {
  constructor(status, response) {
    if(status) {
      this.status = status;
      this.data = response;
    }else {
      this.status = status;
      this.err = response
    }
  }
}

getClassById('5e21c235f1272f316c688076')
// console.log(getClasses())