const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

//Routes
const indexRouteHandler = require("./routes/indexRouteHandler");

// Middle Wares
app.use(cors());
app.use(bodyParser.json());

const greetUser = (req, res, next) => {
  res.status(200).send("Welcome To Your Application !!!");
};

app.get("/", greetUser);


//Handle Route

app.use(indexRouteHandler);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server Started at port ${port}!!`);
});
