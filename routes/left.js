const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const { goLeft } = require("../controller/goLeftController");

router.route("/").post(goLeft);

module.exports = router;
