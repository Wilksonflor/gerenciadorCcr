const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

const Timer = mongoose.model("User", timerSchema);

module.exports = User;
