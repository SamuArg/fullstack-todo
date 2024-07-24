const UserModel = require("../models/UserModel");
// Send all tasks of a user
module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
