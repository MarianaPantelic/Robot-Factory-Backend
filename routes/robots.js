const express = require("express");
const router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const {
  getRobots,
  addRobot,
  deleteRobot,
} = require("../controller/robotsController");

router.route("/").get(getRobots).post(addRobot).delete(deleteRobot);

module.exports = router;
