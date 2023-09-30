const mongoose = require("mongoose");
const clients = require("./clientsModel");

const agendamentoSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  horaInicio: {
    type: String,
    require: true,
  },
  horaTermino: {
    type: String,
    require: true,
  },
  valor: {
    type: Number,
    require: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clients",
  },
});

const Horario = mongoose.model("Horario", agendamentoSchema);

module.exports = Horario;
