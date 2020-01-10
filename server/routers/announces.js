const express = require("express");
const db = require("../../db/models/offers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/add", verifyToken, (req, res) => {
  let { region, price, phone, categorie, description } = req.body;
  let { firstName, lastName, email } = req.user.user;
  let announce = {
    firstName,
    lastName,
    email,
    region,
    price,
    phone,
    description,
    categorie
  };
  console.log(announce);
  db.addToDb(req.body).then(result => res.send(result));
});

router.get("/:id", (req, res) => {
  db.findAll(req.params.id.toLowerCase()).then(result =>
    res.status(200).send(result)
  );
});

module.exports = router;
