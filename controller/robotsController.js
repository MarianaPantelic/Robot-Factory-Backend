const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRobots = (req, res) => {
  const robots = db.get("robots").value();
  res.status(200).send(robots);
};

exports.addRobot = (req, res) => {
  const robot = req.body;
  db.get("robots")
    .push(robot)
    .last()
    .assign({ posX: 0, posY: 0, heading: "NORTH", id: Date.now().toString() })
    .write();
  res.status(201).send(robot);
};

exports.deleteRobot = (req, res) => {
  const inputId = req.body.id;
  db.get("robots").remove({ id: inputId }).write();
  res.status(200).send("Success");
};
