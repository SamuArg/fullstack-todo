const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  try {
    const { mail, password } = req.body;
    console.log(req.body);
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new UserModel({ mail, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: "L'utilisateur a été créé avec succès" });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send({ error: "Le nom d'utilisateur existe déjà" });
    }
    res.status(500).send({ error: error.message });
  }
};
