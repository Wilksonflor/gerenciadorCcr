import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('AGENDAMENTO_MODEL') private readonly agendamentoModel: Model<IAgendamento>,
    @Inject('CLIENTE_MODEL') private readonly clientsModel: Model<ICliente>,
  ) {}
}
