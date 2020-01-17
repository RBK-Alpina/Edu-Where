
const express = require("express");
const db = require("../../db/models/teacher");

const router = express.Router();


router.post("/add", (req, res) => {

  db.saveTeacher(req.body).then((teacher) => {
    res.send(teacher)
  })
    .catch((err) => {
      console.log(err.code)
      res.send(err)

    })

})


router.get('/:username', (req, res) => {
  console.log(req.params)
  db.findTeacher(req.params.username).then((data) => {
    res.send(data)
  })
})


router.put('/teacher', (req, res) => {
  console.log(req.body)
  db.updateTeacherClassroom(req.body.idteacher, req.body.idclass).then((data) => {
    res.send(data)
  })



})

//   router.get("/getAll", verifyToken, (req, res) => {
//   let { firstName, lastName, email } = req.user.user;
//   db.findAllbyName(firstName, lastName).then(result =>
//     res.status(201).json(result)
//   );
//   // db.findAllbyEmail(email).then(result => res.send(result));
// });


// router.get("/:id", (req, res) => {
//   db.findAll(req.params.id.toLowerCase()).then(result => {
//     res.status(200).send(result);
//   });
// });

module.exports = router;
