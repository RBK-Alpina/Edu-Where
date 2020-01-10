const express = require("express");
const db = require("../../db/models/offers");
const router = express.Router();

router.get("/:id", (req, res) => {
  db.findOffer(req.params.id)
    .then(teacher => res.json(teacher))
    .catch(err => {});
});

module.exports = router;
