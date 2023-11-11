import { Document } from 'mongoose';

export interface IUsuario extends Document {
  nomeCompleto: string;
  contato: string;
  username: string;
  password: string;
  // _id: string;
}
