const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    require: true,
  },
  telefone: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
