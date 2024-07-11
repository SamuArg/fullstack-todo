const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const router = require("./router");

dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Starting on port " + PORT);
  app.listen(PORT);
});
