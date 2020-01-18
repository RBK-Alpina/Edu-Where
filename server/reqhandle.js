var { signIn, signUp } = require('../controller/userController')

module.exports.signUp = async (req, res) => {
  var response = await signUp(req.body)
  // console.log(
  //   response,
  //   req.body
  // );
  res.send(response)
}