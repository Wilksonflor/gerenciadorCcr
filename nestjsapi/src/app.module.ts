import { Module } from '@nestjs/common';

import { AgendamentoModule } from './agendamentos/agendamento.module';
import { ClienteModule } from './clientes/cliente.module';
import { UsuarioModule } from './usuarios/usuario.module';

@Module({
  imports: [AgendamentoModule, ClienteModule, UsuarioModule],
})
export class AppModule {}
