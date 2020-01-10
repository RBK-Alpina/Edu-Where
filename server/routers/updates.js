const express = require("express");
const db = require("../../db/models/offers");

const router = express.Router();

router.patch("/views", (req, res) => {
  console.log(req.body.id);
  db.findAndUpdate(req.body.id).then(updatedData => res.send(updatedData));
});

module.exports = router;
