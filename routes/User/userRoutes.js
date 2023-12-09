const express = require("express");

const userRoute = express.Router();

const {
  GetUserDetails,
} = require("../../controllers/userDataRoute.Controller");

userRoute.get("/getuserdetails", GetUserDetails); // For getting USer Data


module.exports = userRoute;
