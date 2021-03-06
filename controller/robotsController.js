const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);
const isEmpty = require("lodash.isempty");
const alert = require("alert");

exports.getRobots = (req, res) => {
  try {
    const robots = db.get("robots").value();
    console.log(robots);
    res.status(200).send(robots);
  } catch (error) {
    console.log(error);
  }
};

exports.addRobot = (req, res, next) => {
  try {
    if (isEmpty(req.body.name)) {
      alert("Pease enter a name!");
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      const robot = req.body;
      console.log(robot);
      db.get("robots")
        .push(robot)
        .last()
        .assign({
          posX: 0,
          posY: 0,
          heading: "NORTH",
          id: Date.now().toString(),
        })
        .write();
      res.status(201).send(robot);
    }
  } catch (error) {
    console.log(error);
    //forward the error to the error handler
    next(error);
  }
};

exports.deleteRobot = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      const inputId = req.body.id;
      db.get("robots").remove({ id: inputId }).write();
      res.status(200).send("Success");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.goLeft = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
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
    }
  } catch (error) {
    console.log(error);
  }
};

exports.goRight = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      let robotId = req.body.id;
      const robots = db.get("robots").value();
      let robot = robots.find((robot) => robot.id == robotId);
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
        .find({ id: robotId })
        .assign({ heading: newHeading })
        .write();
      res.status(200).send(robot);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.moveForward = (req, res, next) => {
  try {
    if (isEmpty(req.body)) {
      //respond with an error
      const error = new Error("Request body is empty");
      //bad request
      error.status = 400;
      //set stack to null
      error.stack = null;
      next(error);
    } else {
      let robotId = req.body.id;
      const robots = db.get("robots").value();
      let robot = robots.find((robot) => robot.id === robotId);
      let posX = Number(robot.posX);
      let posY = Number(robot.posY);
      switch (robot.heading) {
        case "NORTH":
          posY = posY + 1;
          break;
        case "EAST":
          posX = posX + 1;
          break;
        case "SOUTH":
          posY = posY - 1;
          break;
        case "WEST":
          posX = posY - 1;
          break;
        default:
          null;
      }
      db.get("robots")
        .find({ id: robotId })
        .assign({ posX: posX, posY: posY })
        .write();
      res.status(200).send(robot);
    }
  } catch (error) {
    console.log(error);
  }
};
