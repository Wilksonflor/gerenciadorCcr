const mongoose = require("mongoose");

const clientsSchema = new mongoose.Schema({
  nomeCompleto: {
    type: "string",
    required: true,
  },
  contato: {
    type: "string",
    required: true,
  },
  observacoes: {
    type: "string",
    required: false,
  },
});

const Clients = mongoose.model("Clients", clientsSchema);

module.exports = Clients;
