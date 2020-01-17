const teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var signUp = (request) => {//request : user information

  if (request.occupation === "teacher") {
    teacher.saveTeacher(request).then((user) => {
      const secret = process.env.JWT_SECRET;
      const expire = 3600;
      const token = jwt.sign(user, secret, {
        expiresIn: expire
      });
      return { saved: true, username: user.username, token: token }
      )
      .catch((err) => {//
        if (err.code === 11000) return ({ saved: false, username: err: 'duplicate entry '})
        return ({ saved: false, username: err: err })

      }
      });
})
}
else {
  //need student module
}
}

const signIn = async (request) => {
  teacher.findTeacher(request.username).then((user) => {
    if (user) {
      let pswd = await bcrypt.compare(password, user.password);
      if (psw) {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign(user, secret, {
          expiresIn: expire
        });
        return { username: user.username, role: 'teacher', token: token }
      }
      return false
    } else {
      //student search............
    }
  })
}

module.exports.signIn = signIn;
module.exports.signUp = signUp;