const express = require("express");

const loginRoute = express.Router();

const { verifyUser } = require("../controllers/authenticationRoute.Controller");

loginRoute.post("/login/verifyuser", verifyUser);

module.exports = loginRoute;
