const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  f_name: {
    type: String,
    required: true,
  },
  l_name: {
    type: String,
    required: true,
  },
  mobile: String,
  whatsapp: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
