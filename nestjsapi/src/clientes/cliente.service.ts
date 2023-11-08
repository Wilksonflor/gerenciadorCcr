import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
// import { InjectModel } from '@nestjs/mongoose';
// import { CreateAgendamentoDto } from './dto/agendamento.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('AGENDAMENTO_MODEL') private readonly agendamentoModel: Model<IAgendamento>,
    @Inject('CLIENTE_MODEL') private readonly clientsModel: Model<ICliente>,
  ) {}
}
