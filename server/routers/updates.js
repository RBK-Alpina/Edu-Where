const express = require("express");
const db = require("../../db/models/offers");

const router = express.Router();

router.patch("/views", (req, res) => {
  db.findAndUpdate(req.body.id)
    .then(updatedData => res.send(updatedData))
    .catch(err => console.log(err));
});

router.patch("/ratings", (req, res) => {
  let rating = parseInt(req.body.rating);
  let id = req.body.id;
  db.findOne(id)
    .then(user => {
      return (user.rating + rating) / 2;
    })
    .then(ratings => db.updateRating(id, ratings))
    .then(updatedData => res.send("updated"))
    .catch(err => console.log(err));
});
module.exports = router;
