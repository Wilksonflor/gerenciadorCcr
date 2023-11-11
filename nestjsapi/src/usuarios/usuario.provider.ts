import { Mongoose } from 'mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';

export const usuarioProviders = [
  {
    provide: 'USUARIO_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('usuario', UsuarioSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
