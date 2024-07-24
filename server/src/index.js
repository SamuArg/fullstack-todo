const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");

// Get the .env
dotenv.config();
const corsOptions = {
  origin: process.env.FRONTEND_URI,
};

const app = express();

app.use(express.json());
//Cors headers
app.use(cors(corsOptions));
app.use(router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Starting on port " + process.env.PORT);
  app.listen(process.env.PORT);
});
