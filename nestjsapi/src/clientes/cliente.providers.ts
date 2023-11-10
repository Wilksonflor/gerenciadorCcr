import { Mongoose } from 'mongoose';
import { ClienteSchema } from './schemas/cliente.schema';

export const clienteProviders = [
  {
    provide: 'CLIENTE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('clients', ClienteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
