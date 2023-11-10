import * as mongoose from 'mongoose';

export const ClienteSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  nomeCompleto: { type: String, required: true },
  contato: { type: String, required: true },
  observacoes: { type: String, required: true },
});
