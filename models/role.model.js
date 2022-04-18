const mongoose = require("mongoose"),
  Role = mongoose.Schema;

const schema = new Role({
  name: {
    type: String,
  },
});
schema.set("timestamps", true);
module.exports = mongoose.model("Role", schema);
