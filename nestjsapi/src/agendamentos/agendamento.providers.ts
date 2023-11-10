import { Mongoose } from 'mongoose';
import { AgendamentoSchema } from './schemas/agendamento.schema';

export const agendamentoProviders = [
  {
    provide: 'AGENDAMENTO_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('horarios', AgendamentoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
