import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://wilksonflor12:wilkson88118577@cluster0.m33sao3.mongodb.net/colegioReal'),
  },
];
