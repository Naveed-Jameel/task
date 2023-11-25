const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send({ msg: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY || "jwtPrivateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({msg: "Invalid token."});
  }
};
