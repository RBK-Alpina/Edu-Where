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

        const details = new Details(user.username, token, "teacher")

        return new AuthResponse("success", details)

      })
      .catch((err) => {//
        if (err.code === 11000) return userExistsResponse;
        return serverErrorResponse;

      });
  }
  else {
    student.addNewstudent(request)
      .then((user) => {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign(user, secret, { expiresIn: expire })
        const details = new Details(user.username, token, "student")

        return new AuthResponse("success", details)
      })
      .catch((err) => {//
        if (err.code === 11000) return userExistsResponse;
        return serverErrorResponse;
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
          const details = new Details(user.username, token, "teacher")

          return new AuthResponse("success", details)
        }
        return wrongEntryPssword//wrong  username or password
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
                const details = new Details(user.username, token, "student")
                return new AuthResponse("success", details)
              }
              return wrongEntryPssword
            }
            else { return wrongEntryUsername })
      }
    })

}
}
class Details {
  constructor(username, token, role) {
    this.username = username;
    this.token = token;
    this.role = role
  }
}

class AuthResponse {
  constructor(status, details) {
    this.status = status;
    this.details = details;
  }
}

const userExistsResponse = new AuthResponse("User Already Exists", {});
const serverErrorResponse = new AuthResponse("Server Side Error", {});


const wrongEntryPssword = new AuthResponse("wrong password", {});
const wrongEntryUsername = new AuthResponse("wrong Username", {});

module.exports.signIn = signIn;
module.exports.signUp = signUp;