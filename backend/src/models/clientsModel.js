const mongoose = require('mongoose')

const clientsSchema = new mongoose.Schema({
    nome: {
        type: 'string',
        require: true,
    },
    telefone: {
        type: "string",
        require: true,
    }
}) 

const Clients = mongoose.model('Clients', clientsSchema)

module.exports = Clients;