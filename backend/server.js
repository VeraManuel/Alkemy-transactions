const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./api/models");

const app = express();

var corsOption = {
  origin: "http://localhost:8081",
};

// cors
app.use(cors(corsOption));

// parse request of application/json
app.use(bodyParser.json());

// parse reques of application/x-www-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get("/", (req, res) => {
  res.json({ message: "Transaction app" });
});

// Server up
app.listen({ port: 8081 }, async () => {
  console.log(`Server up in http://localhost:8081`);
  await sequelize.authenticate({ force: true });
  console.log("DataBase Conected");
});
