const teacher = require("../db/models/teacher");
const student = require("../db/models/student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthResponse } = require('./responseModel')

require("dotenv").config();
var signUp = async (request) => {//request : user information

  if (request.role === "teacher") {
    // console.log("--->", request)
    return teacher.saveTeacher(request)
      .then((user) => {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        console.log('user====>', user)
        const token = jwt.sign({user}, secret, { expiresIn: '20m' })
        console.log('token====>', token)
        const details = new Details(user.username, token, "teacher")

        return new AuthResponse("success", details)

      })
      .catch((err) => {//
        if (err.code === 11000) return userExistsResponse;
        console.log(err)
        return serverErrorResponse;

      });
  }
  else {
    return student.addNewstudent(request)
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
    .then(async (user) => {
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
        return wrongEntryPssword
      } else {
        student.findStudent(request.username)
          .then(async (user) => {
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
            else { return wrongEntryUsername }
          })
      }

    })
}
class Details {
  constructor(username, token, role) {
    this.username = username;
    this.token = token;
    this.role = role
  }
}



const userExistsResponse = new AuthResponse("User Already Exists", {});
const serverErrorResponse = new AuthResponse("Server Side Error", {});


const wrongEntryPssword = new AuthResponse("wrong password", {});
const wrongEntryUsername = new AuthResponse("wrong Username", {});

module.exports.signIn = signIn;
module.exports.signUp = signUp;