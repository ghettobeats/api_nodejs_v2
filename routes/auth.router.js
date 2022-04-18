const express = require("express"),
  auth = express.Router(),
  authController = require("../controllers/login.controller");

auth.post("/log", authController.auth);

module.exports = auth;
