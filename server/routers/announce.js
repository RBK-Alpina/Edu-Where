const express = require("express");
const db = require("../../db/models/offers");

const router = express.Router();

router.get("/:id", (req, res) => {
  db.findOne(req.params.id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
