import { Model } from 'mongoose';
import { AgendamentoModel } from '../models/agendamentoModel';
import { ClientsModel } from '../models/clientsModel';
export declare class AgendamentoService {
    private readonly agendamentoModel;
    private readonly clientsModel;
    constructor(agendamentoModel: Model<AgendamentoModel>, clientsModel: Model<ClientsModel>);
    criarHorario(data: any): Promise<any>;
    getHorarios(): Promise<Omit<any, never>[]>;
    verificarDisponibilidade(date: string, horaInicio: string, horaTermino: string): Promise<boolean>;
}
