var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const robotsRouter = require("./routes/robots");

/*CORS Security for the clients website to disable same-origin-policy for only his website */
//import of the security middleware
const { setCors } = require("./middleware/security");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

var app = express();

const adapter = new FileSync("data/db.json");
const db = low(adapter);
//add default entries to the DATABASE
db.defaults({
  robots: [],
}).write();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//SET CORS TO OMIT SECURITY ERRORS
app.use(setCors);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/robots", robotsRouter);

/*
ERROR HANDLING
*/
app.use((err, req, res, next) => {
  //respond to the requestor with the error messages
  //set response status to 500
  console.log(err);
  res.status(500).send({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
