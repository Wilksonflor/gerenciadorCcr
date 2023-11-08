import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { agendamentoProviders } from '../agendamentos/agendamento.providers';
import { clienteProviders } from './cliente.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [ClienteService, ...clienteProviders, ...agendamentoProviders],
})
export class ClienteModule {}
