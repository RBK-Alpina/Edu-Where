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
      res.forEach(classRoom => {
        delete classRoom.posts;
        if (studentId != undefined) {
          studentClass
            .check({ student: studentId, class: classRoom._id })
            .then(value => {
              classRoom.enrolled = value;
              callback(new Response(true, res));
            });
        } else {
          callback(new Response(true, res));
        }
      });
    })
    .catch(err => {
      new Response(false, err);
    });
};

module.exports.getClassById = getClassById = async classId => {
  return classRoom
    .find({ _id: classId })
    .then(res => {
      return new Response(true, res[0]);
    })
    .catch(err => {
      return new Response(false, err);
    });
};

module.exports.addClass = addClass = async classObj => {
  return classRoom
    .create(classObj)
    .then(res => {
      return new Response(true, res);
    })
    .catch(err => {
      return new Response(false, err);
    });
};

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

// getClassById('5e21c235f1272f316c688076')
// console.log(getClasses())

getClasses(result => {
  console.log(result);
});
