let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let router = require("./routes/index");
let cors = require("cors");

global.__root = __dirname + "/";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.get("/test", (req, res) => {
  res.status(200).send("Welcome to The Runway Backend  System");
});

module.exports = app;
