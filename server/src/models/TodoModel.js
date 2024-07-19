const mongoose = require("mongoose");
//Modèle d'une tâche
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    required: true,
  },
  urgent: {
    type: String,
    enum: ["0", "1"],
    required: true,
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
