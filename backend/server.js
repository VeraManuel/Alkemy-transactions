const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./api/models");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

// Loading routes
const user_routes = require("./api/routes/user");
const operation_routes = require("./api/routes/operation");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors

app.use(cors(corsOptions));

// Routes
app.use("/api", user_routes);
app.use("/api", operation_routes);

// Server up
app.listen({ port: 8080 }, async () => {
  console.log(`Server up in http://localhost:8080`);
  await sequelize.authenticate({ force: true });
  console.log("DataBase Conected");
});
