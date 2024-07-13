const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.todoId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "Utilisateur non trouvé" });
    }
    const todo = user.todos.id(todoId);
    if (!todo) {
      return res.status(404).send({ error: "Todo non trouvé" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
