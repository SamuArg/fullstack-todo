const UserModel = require("../models/UserModel");
// Renvoie tous les tâches d'un utilisateur spécifié
module.exports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "Utilisateur non trouvé" });
    }
    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
