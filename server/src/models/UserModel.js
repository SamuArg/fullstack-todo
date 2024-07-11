const mongoose = require("mongoose");
const TodoModel = require("./TodoModel");

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [TodoModel.schema],
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
