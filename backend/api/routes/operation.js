const express = require("express");
const operationController = require("../controllers/opetarion.controller");
const { authJwt } = require("../middleware");

const api = express.Router();

api.post("/operation/create", authJwt.verifyToken, operationController.create);

module.exports = api;
