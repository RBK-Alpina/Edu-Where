const express = require("express");
const User = require("../../db/models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const router = express.Router();

router.post("/signUp", (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  User.saveUser(firstName, lastName, email, password)
    .then(savedUser => {
      const user = {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email
      };
      const secret = process.env.JWT_SECRET;
      const expire = 3600;
      const token = jwt.sign(user, secret, {
        expiresIn: expire
      });
      console.log("saved");
      return res.status(201).send({ saved: true, user: savedUser, token });
    })
    .catch(err => {
      console.log(err);
      res.status(201).json({
        saved: false,
        msg: "There is already an account with this email"
      });
    });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  User.findUser(email, password)
    .then(user => {
      if (user.found) {
        const secret = process.env.JWT_SECRET;
        const expire = 3600;
        const token = jwt.sign(user, secret, {
          expiresIn: expire
        });
        return res.send({ found: true, token });
      } else {
        res.status(201).json({ found: false, msg: "Wrong password or email" });
      }
    })
    .catch(err => res.status(500).json({ err }));
});

module.exports = router;
