import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
export declare class UsuarioService {
    private readonly agendamentoModel;
    private readonly clientsModel;
    constructor(agendamentoModel: Model<IAgendamento>, clientsModel: Model<ICliente>);
}
