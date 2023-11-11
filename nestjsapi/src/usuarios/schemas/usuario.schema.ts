import * as mongoose from 'mongoose';

export const UsuarioSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  contato: { type: String, required: true },
  usuername: { type: String, required: true },
  password: { type: String, required: true },
});
