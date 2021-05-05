const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.goLeft = (req, res) => {
  let robotId = req.body.id;
  const robots = db.get("robots").value();
  let robot = robots.find((robot) => robot.id == robotId);

  console.log(robot);
  const checkHeading = (heading) => {
    switch (heading) {
      case "NORTH":
        return (heading = "WEST");
      case "EAST":
        return (heading = "NORTH");
      case "SOUTH":
        return (heading = "EAST");
      case "WEST":
        return (heading = "SOUTH");
    }
  };
  let newHeading = checkHeading(robot.heading);
  db.get("robots")
    .find({ id: robotId })
    .assign({ heading: newHeading })
    .write();
  res.status(200).send(robot);
};
