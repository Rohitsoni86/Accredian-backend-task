const express = require("express");

const signupRoute = express.Router();

const { createNewUser } = require("../controllers/authenticationRoute.Controller");

signupRoute.post("/signup/createnewuser", createNewUser);

module.exports = signupRoute;
