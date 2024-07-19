const jwt = require("jsonwebtoken");
// Vérifie si l'utilisateur est bien connecté et renvoie le token de connexion
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).send("Non connecté");
  } else {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send("Non connecté");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
