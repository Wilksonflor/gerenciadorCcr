const mongoose = require("mongoose");
const clients = require("./clientsModel");

const agendamentoSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  horaInicio: {
    type: String,
    required: true,
  },
  horaTermino: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clients",
  },
  modalidade: {
    type: String,
    require: true,
  },
});

const Horario = mongoose.model("Horario", agendamentoSchema);

module.exports = Horario;
