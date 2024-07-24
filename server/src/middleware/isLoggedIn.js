const jwt = require("jsonwebtoken");
// Check if the user is connected
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    res.status(401).send("Not connected");
  } else {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send("Not connected");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};
