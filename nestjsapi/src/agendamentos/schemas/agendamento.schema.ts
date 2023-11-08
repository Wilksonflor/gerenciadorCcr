import * as mongoose from 'mongoose';

export const AgendamentoSchema = new mongoose.Schema({
  date: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaTermino: { type: String, required: true },
  valor: { type: Number, required: true },
  client: { type: String, required: true },
});
