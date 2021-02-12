const express = require("express");
const userController = require("../controllers/user.controller");
const { verifySignUp, authJwt } = require("../middleware");

const api = express.Router();

api.post(
  "/user/signup",
  verifySignUp.checkDuplicateEmail,
  userController.createUser
);
api.post("/user/signin", userController.userSignin);
api.get("/user/:id", authJwt.verifyToken, userController.getUser);
api.put("/user/:id", authJwt.verifyToken, userController.updateUser);
api.delete("/user/:id", authJwt.verifyToken, userController.deleteUser);

module.exports = api;
