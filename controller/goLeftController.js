const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { set } = require("../app");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.goLeft = (req, res) => {
  let robotName = req.body.name;
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.name === robotName);
  switch (robot.heading) {
    case "NORTH":
      robot.heading = "WEST";
      break;
    case "EAST":
      robot.heading = "NORTH";
      break;
    case "SOUTH":
      robot.heading = "EAST";
      break;
    case "WEST":
      robot.heading = "SOUTH";
      break;
    default:
      null;
  }
  res.status(200).send(robot);
};

db.get("posts").find({ title: "low!" }).assign({ title: "hi!" }).write();
