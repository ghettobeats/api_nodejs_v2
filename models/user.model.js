const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    },
  ],
});
schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, hash_password);
};
schema.set("timestamps", true);

module.exports = mongoose.model("user", schema);
