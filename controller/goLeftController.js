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
      db.get("robots")
        .find({ name: robotName })
        .assign({ heading: "WEST" })
        .write();
      break;
    case "EAST":
      db.get("robots")
        .find({ name: robotName })
        .assign({ heading: "NORTH" })
        .write();

      break;
    case "SOUTH":
      db.get("robots")
        .find({ name: robotName })
        .assign({ heading: "EAST" })
        .write();

      break;
    case "WEST":
      db.get("robots")
        .find({ name: robotName })
        .assign({ heading: "SOUTH" })
        .write();

      break;
    default:
      null;
  }
  res.status(200).send(robot);
};
