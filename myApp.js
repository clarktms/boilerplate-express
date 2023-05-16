let express = require("express");
let app = express();
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

app.get("/name", (req, res) => {
  res.json({ name: res.query.first + " " + res.query.last });
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
