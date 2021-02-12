const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./api/models");

const app = express();

// Loading routes
const user_routes = require("./api/routes/user");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors

// Routes
app.use("/api", user_routes);

// Server up
app.listen({ port: 8080 }, async () => {
  console.log(`Server up in http://localhost:8080`);
  await sequelize.authenticate({ force: true });
  console.log("DataBase Conected");
});
