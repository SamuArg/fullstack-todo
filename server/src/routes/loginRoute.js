const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");

//Login a user
module.exports = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await UserModel.findOne({ mail });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }
    const userId = { userId: user._id };
    const token = jwt.sign(userId, process.env.SECRET, { expiresIn: "1h" });
    res.status(200).send({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
