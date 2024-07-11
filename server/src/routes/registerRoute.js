const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (password.length < 8) {
      return res.status(400).send({ error: "Le mot de passe est trop court" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ mail, password: hashedPassword });
    const validationError = newUser.validateSync();
    if (validationError) {
      return res.status(400).send({ error: validationError.message });
    }
    await newUser.save();
    res.status(201).send({ message: "L'utilisateur a été créé avec succès" });
  } catch (error) {
    // Si il y a duplication de mail
    if (error.code === 11000) {
      return res.status(400).send({ error: "Le mail existe déjà" });
    }
    res.status(500).send({ error: error.message });
  }
};
