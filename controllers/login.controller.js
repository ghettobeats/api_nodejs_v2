const jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  User = require("../models/user.model");

exports.auth = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  const correctPassword =
    user === null
      ? false
      : await bcrypt.compare(req.body.hash_password, user.hash_password);
  if (!(user && correctPassword)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.SECRET,
    { expiresIn: "1800s" }
  );

  res.status(200).json({ token, username: user.username, email: user.email });
};
