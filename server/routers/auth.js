const express = require("express");
const user = require("../../db/models/users");

const router = express.Router();

router.post("/signUp", (req, res) => {
  let { username, email, password } = req.body;
  user
    .saveUser(username, email, password)
    .then(savedUser => res.status(201).json(savedUser))
    .catch(err => es.status(500).json(err));
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  user
    .findUser(email, password)
    .then(user => res.status(201).json(user))
    .catch(err => es.status(500).json(err));
});

module.exports = router;
