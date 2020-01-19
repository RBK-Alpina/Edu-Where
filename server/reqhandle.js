var { signIn, signUp } = require("../controller/userController");
var { addClass, getClasses } = require("../controller/classRoomController");
var { getClassesOfStudent } = require("../controller/studentClassController");

module.exports.signUp = async (req, res) => {
  var response = await signUp(req.body);
  // console.log(
  //   response,
  //   req.body
  // );
  res.send(response);
};

module.exports.signIn = async (req, res) => {
  var response = await signIn(req.body);
  console.log(response, req.body);
  console.log(response, req.body);
  res.send(response);
};

//classroom
module.exports.addClass = async (req, res) => {
  var response = await addClass(req.body);

  res.send(response);
};

module.exports.getClassesOfStudent = async (req, res) => {
  var response = await getClassesOfStudent();
  console.log(response);
  res.send(response);
};

module.exports.getClasses = async (req, res) => {
  getClasses(response => {
    console.log(response)
    res.send(response);
  });
};
