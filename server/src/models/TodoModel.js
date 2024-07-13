const mongoose = require("mongoose");

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
    validate: {
      validator: function (value) {
        return value >= new Date(); //Vérifie si la date rentrée est dans le futur
      },
      message: "La date ne peut pas être dans le passé",
    },
  },
  urgent: {
    type: String,
    enum: ["0", "1"],
    required: true,
  },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
