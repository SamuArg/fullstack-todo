const UserModel = require("../models/UserModel");
// Edit an existing task
module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.todoId;
    const updates = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const todo = user.todos.id(todoId);
    if (!todo) {
      return res.status(404).send({ error: "Todo non trouvé" });
    }
    //Check which fields need to be updated
    if (updates.title !== undefined) {
      todo.title = updates.title;
    }
    if (updates.description !== undefined) {
      todo.description = updates.description;
    }
    if (updates.completed !== undefined) {
      todo.completed = updates.completed;
    }
    if (updates.date !== undefined) {
      todo.date = updates.date;
    }
    if (updates.urgent !== undefined) {
      todo.urgent = updates.urgent;
    }
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
