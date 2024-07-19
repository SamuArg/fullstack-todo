const mongoose = require("mongoose");
const TodoModel = require("./TodoModel");

const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//Modèle d'un utilisateur
const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    match: mailRegex,
    //Vérifie si le mail respecte le regex
  },
  password: {
    type: String,
    required: true,
  },
  todos: [TodoModel.schema],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
