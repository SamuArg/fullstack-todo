const UserModel = require("../models/UserModel");
//Add a task to a user
module.exports = async (req, res) => {
  try {
    const { title, description, completed, date, urgent } = req.body;
    const userId = req.user.userId;
    const newTodo = { title, description, completed, date, urgent };
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    user.todos.push(newTodo);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
