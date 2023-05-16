let express = require("express");
let app = express();
let bodyParser = require("body-parser");
require("dotenv").config();

app.use("/public", express.static(__dirname + "/public"));

app.use("/", (req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

//app.route(path).get(handler).post(handler);
app.use(bodyParser.urlencoded({ extended: false }));

app
  .route("/name")
  .get((req, res) => {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post((req, res) => {
    res.json({ name: req.body.first + " " + req.body.last });
  })
  .put((req, res) => {
    res.send(null);
  });

console.log("Hello World");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

// app.get("/json", (req, res) => {
//   if (process.env.MESSAGE_STYLE === "uppercase") {
//     res.json({ message: "HELLO JSON" });
//   } else {
//     res.json({ message: "Hello json" });
//   }
// });

module.exports = app;
