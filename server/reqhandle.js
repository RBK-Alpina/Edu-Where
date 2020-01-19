var { signIn, signUp } = require("../controller/userController");
var {
  addClass,
  getClasses,
  getClassById
} = require("../controller/classRoomController");
var { getClassesOfStudent } = require("../controller/studentClassController");
const {addPost} = require('../controller/postController')
const {addComment} = require('../controller/commentController')

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
    res.send(response);
  });
};

module.exports.getClass = async (req, res) => {
  var id = req.params.id;
  console.log(id, "id here");
  var result = await getClassById(id);
  console.log(result);
  res.send(result);
};

module.exports.addPost = async (req, res) => {
  var classRoomId = req.params.id;
  // console.log('hi',req, classRoomId)
  addPost(req.body, classRoomId)
  .then(result => {
    res.send(result)
  })
}

module.exports.addComment = async (req, res) => {

  addComment(req.body, req.params.id)
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    console.log(err)
  })
}