const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.goRight = (req, res) => {
  let robotName = req.body.name;
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.name === robotName);
  const checkHeading = (heading) => {
    switch (heading) {
      case "NORTH":
        return (heading = "EAST");
      case "EAST":
        return (heading = "SOUTH");
      case "SOUTH":
        return (heading = "WEST");
      case "WEST":
        return (heading = "NORTH");
    }
  };
  let newHeading = checkHeading(robot.heading);
  db.get("robots")
    .find({ name: robotName })
    .assign({ heading: newHeading })
    .write();
  res.status(200).send(robot);
};
