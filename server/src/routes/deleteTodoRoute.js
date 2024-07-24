const UserModel = require("../models/UserModel");
// Delete a task
module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.todoId;
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
