const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    console.log(1);
    res.status(401).send("/");
  }
  try {
    console.log(2);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("/");
  }
};

module.exports = verifyToken;
