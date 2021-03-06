const express = require("express");
const operationController = require("../controllers/opetarion.controller");
const { authJwt } = require("../middleware");

const api = express.Router();

api.post("/operation", authJwt.verifyToken, operationController.create);
api.get("/operation", authJwt.verifyToken, operationController.getOperations);
api.get(
  "/operation/:id",
  authJwt.verifyToken,
  operationController.getOperation
);
api.get("/operation-type", authJwt.verifyToken, operationController.getByType);
api.get("/operation-total", authJwt.verifyToken, operationController.getTotals);
api.put(
  "/operation/:id",
  authJwt.verifyToken,
  operationController.updateOperation
);
api.delete(
  "/operation/:id",
  authJwt.verifyToken,
  operationController.deleteOperation
);

module.exports = api;
