const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./api/models");

const app = express();

// Loading routes
const user_routes = require("./api/routes/user");
const operation_routes = require("./api/routes/operation");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
app.use("/api", user_routes);
app.use("/api", operation_routes);

// Server up
app.listen({ port: 8080 }, async () => {
  console.log(`Server up in http://localhost:8080`);
  await sequelize.authenticate({ force: true });
  console.log("DataBase Conected");
});
