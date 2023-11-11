import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { DatabaseModule } from '../database/database.module';
import { agendamentoProviders } from '../agendamentos/agendamento.providers';
import { clienteProviders } from '../clientes/cliente.providers';
import { usuarioProviders } from './usuario.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...agendamentoProviders, ...clienteProviders, ...usuarioProviders],
})
export class UsuarioModule {}
