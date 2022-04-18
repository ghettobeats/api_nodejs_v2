const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(403).json({ message: "Access denied." });
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded;
  next();
};
