const express = require("express");
const app = express();
const path = require("path");
const db = require("../db");

app.use("/", express.static(path.join(__dirname + "/../dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

app.use("/api", require("./routes"));

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

db.syncAndSeed().then(() => {
  console.log("seeded");
});

module.exports = app;
