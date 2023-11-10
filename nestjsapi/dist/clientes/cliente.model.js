"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientsSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Horario',
    },
});
exports.default = (0, mongoose_1.model)('Clients', clientsSchema);
//# sourceMappingURL=cliente.model.js.map