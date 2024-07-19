const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");

// Récupère le .env
dotenv.config();

const app = express();

app.use(express.json());
//Entête cors
app.use(cors());
app.use(router);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Starting on port " + process.env.PORT);
  app.listen(process.env.PORT);
});
