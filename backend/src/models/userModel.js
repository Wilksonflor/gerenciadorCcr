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
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
