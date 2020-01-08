const express = require("express");
const user = require("../../db/models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

router.post("/signUp", (req, res) => {
  let { username, email, password } = req.body;
  console.log(req.body);
  user
    .saveUser(username, email, password)
    .then(savedUser => res.status(201).json({ saved: true, user: savedUser }))
    .catch(err => {
      res.status(201).json({
        saved: false,
        msg: "There is already an account with this email"
      });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  user
    .findUser(email, password)
    .then(user => {
      console.log(user);
      if (user.found) {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign({ id: user._id }, secret, {
          expiresIn: expire
        });
        return res.send({ token });
      } else {
        res.status(201).json(user.found);
      }
    })
    .catch(err => res.status(500).json({ err }));
});

module.exports = router;
