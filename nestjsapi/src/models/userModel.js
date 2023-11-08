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
  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clients",
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
