import { Schema, Document, model } from 'mongoose';

interface IClients {
  nomeCompleto: string;
  contato: string;
  observacoes?: string;
  client: Schema.Types.ObjectId; 
}

interface IClientsDocument extends IClients, Document {}

const clientsSchema = new Schema<IClientsDocument>({
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
    type: Schema.Types.ObjectId,
    ref: 'Horario',
  },
});

export default model<IClientsDocument>('Clients', clientsSchema);
