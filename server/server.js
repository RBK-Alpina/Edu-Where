const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("../db/index.js");
const authRoute = require("./routers/auth");
const top3 = require("./routers/top3");
const announce = require("./routers/announce");
const announces = require("./routers/announces");
const updates = require("./routers/updates");
require("dotenv").config();

let PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//serving the react folder
// app.use(express.static(path.resolve(__dirname, "../react-client/dist")));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/categorie", top3);
app.use("/announces", announces);
app.use("/announce", announce);
app.use("/auth", authRoute);
app.use("/update", updates);

//for every req that dosen't have a route serve the index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../react-client/dist", "index.html"));
});
