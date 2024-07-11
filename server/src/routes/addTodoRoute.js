const UserModel = require("../models/UserModel");

module.exports = async (req, res) => {
  try {
    const { title, description, completed, date } = req.body;
    const userId = req.user.userId;
    const newTodo = { title, description, completed, date };
    const validationError = newTodo.validateSync();
    if (validationError) {
      return res.status(400).send({ error: validationError.message });
    }
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { todos: newTodo } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
