import { Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { agendamentoProviders } from './agendamento.providers';
import { clienteProviders } from '../clientes/cliente.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoService, ...agendamentoProviders, ...clienteProviders],
})
export class AgendamentoModule {}
