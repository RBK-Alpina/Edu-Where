const teacher = require("../models/teacher");
const student = require("../models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var signUp = (request) => {//request : user information
  if (request.occupation === "teacher") {
    teacher.saveTeacher(request)
      .then((user) => {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign(user, secret, { expiresIn: expire })

        return { saved: true, username: user.username, token: token }

      })
      .catch((err) => {//
        if (err.code === 11000) return ({ status: false, username: err: 'duplicate entry '})
        return ({ saved: false, username: err  })

      });
  }
  else {
    student.addNewstudent(request)
      .then((user) => {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign(user, secret, { expiresIn: expire })
        return { saved: true, username: user.username, token: token }
      })
      .catch((err) => {//
        if (err.code === 11000) return ({ saved: false, username: err: 'duplicate entry '})
        return ({ saved: false, username: err: err })
      });
  }
}

const signIn = async (request) => {// return object if existing user , false if psw or username are wrong
  teacher.findTeacher(request.username)
    .then((user) => {
      if (user) {// if user a teacher
        let pswd = await bcrypt.compare(password, user.password);
        if (psw) {
          const secret = process.env.JWT_SECRET;
          const expire = 3600;
          const token = jwt.sign(user, secret, {
            expiresIn: expire
          });
          return { username: user.username, role: 'teacher', token: token }
        }
        return false//wrong  username or password
      } else {
        student.findStudent(request.username)
          .then(user => {
            if (user) {// if user a teacher
              let pswd = await bcrypt.compare(password, user.password);
              if (psw) {
                const secret = process.env.JWT_SECRET;
                const expire = 3600;
                const token = jwt.sign(user, secret, {
                  expiresIn: expire
                });
                return { username: user.username, role: 'student', token: token }
              }
              return false
            })
      }
    })
}

module.exports.signIn = signIn;
module.exports.signUp = signUp;