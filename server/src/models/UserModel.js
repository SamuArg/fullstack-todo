const mongoose = require("mongoose");
const TodoModel = require("./TodoModel");

const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//Model of a user
const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
    match: mailRegex,
    //Check if mail respect the regex
  },
  password: {
    type: String,
    required: true,
  },
  todos: [TodoModel.schema],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
