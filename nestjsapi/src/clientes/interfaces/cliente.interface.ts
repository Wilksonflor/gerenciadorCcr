import { Document } from 'mongoose';

export interface ICliente extends Document {
  nomeCompleto: string;
  contato: string;
  observacoes?: string;
  // _id: string;
}
