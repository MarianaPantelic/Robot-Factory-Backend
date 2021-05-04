const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.moveForward = (req, res) => {
  let robotName = req.body.name;
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.name === robotName);
  let posX = Number(robot.posX);
  let posY = Number(robot.posY);
  switch (robot.heading) {
    case "NORTH":
      db.get("robots")
        .find({ name: robotName })
        .assign({ posY: posY + 1 })
        .write();
      break;
    case "EAST":
      db.get("robots")
        .find({ name: robotName })
        .assign({ posX: posX + 1 })
        .write();
      break;
    case "SOUTH":
      db.get("robots")
        .find({ name: robotName })
        .assign({ posY: posY - 1 })
        .write();
      break;
    case "WEST":
      db.get("robots")
        .find({ name: robotName })
        .assign({ posX: posX - 1 })
        .write();
      break;
    default:
      null;
  }
  res.status(200).send(robot);
};
