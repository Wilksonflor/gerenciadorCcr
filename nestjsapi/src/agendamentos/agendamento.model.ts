import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Clients } from './clients.model';

@Schema()
export class Agendamento {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ required: true })
  horaTermino: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ type: Clients })
  client: Clients;
}

export type AgendamentoDocument = Agendamento & Document;

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);
