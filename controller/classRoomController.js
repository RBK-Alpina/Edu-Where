const classRoom = require("../db/models/classRoom");
const studentClass = require("../db/models/studentClass");

module.exports.getClasses = getClasses = async (
  callback,
  studentId = undefined
) => {
  classRoom
    .find()
    .lean()
    .then(res => {
      res.forEach((classRoom, i) => {
        delete classRoom.posts;
        if (studentId != undefined) {
          studentClass
            .check({ student: studentId, class: classRoom._id })
            .then(value => {
              classRoom.enrolled = value;
              i == res.length - 1 ? callback(new Response(true, res)) : null;
            });
        } else {
          i == res.length - 1 ? callback(new Response(true, res)) : null;
        }
      });
    })
    .catch(err => {
      new Response(false, err);
    });
};

module.exports.getClassById = getClassById = async classId => {
  return classRoom
    .find({ _id: classId }).populate(['teacher', {
      path : 'posts',
      populate : {
        path : 'comments',
        populate: {
          path: 'student'
        }
      }
    }])
    .then(res => {
      return new Response(true, res[0]);
    })
    .catch(err => {
      return new Response(false, err);
    });
};

module.exports.addClass = addClass = (classObj) => {
  return classRoom.create(classObj)
    .then(res => {
      return teacher.updateTeacherClassroom(classObj.teacher, res._id).then((result) => {
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
      this.err = response;
    }
  }
}


// addClass({ name: 'testclass' })
// console.log(getClasses())

// getClassById('5e21c235f1272f316c688076')
// console.log(getClasses())

//getClasses(result => {
  //console.log(result);
//});

