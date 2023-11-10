import { Document } from 'mongoose';

export interface IAgendamento extends Document {
  date: string;
  horaInicio: string;
  horaTermino: string;
  valor: number;
  client: string;
}
