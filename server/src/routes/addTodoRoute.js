const UserModel = require("../models/UserModel");
//Ajoute une tâche a un utilisateur
module.exports = async (req, res) => {
  try {
    const { title, description, completed, date, urgent } = req.body;
    const userId = req.user.userId;
    const newTodo = { title, description, completed, date, urgent };
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "Utilisateur non trouvé" });
    }
    user.todos.push(newTodo);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
