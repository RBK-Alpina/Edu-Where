const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).send("You need to be connected");

  const verified = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("You need to be connected");
    console.log(user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
