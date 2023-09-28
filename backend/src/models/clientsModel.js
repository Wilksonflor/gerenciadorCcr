const mongoose = require("mongoose");

const clientsSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: true,
  },
  contato: {
    type: String, 
    required: true,
  },
  observacoes: {
    type: String,
    required: false,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Horario"
  }
});

const Clients = mongoose.model("Clients", clientsSchema);

module.exports = Clients;
