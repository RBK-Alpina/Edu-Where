const jwt = require("jsonwebtoken");
const { AuthResponse } = require('../../controller/responseModel');

const invalidToken = new AuthResponse("Invalid Token", {});


let verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send(invalidToken);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).send(invalidToken);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
