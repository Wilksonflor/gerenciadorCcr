/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { CreateAgendamentoDto, updateAgendamentoDto } from './dto/agendamento.dto';
import { IAgendamento } from './interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
export declare class AgendamentoService {
    private readonly agendamentoModel;
    private readonly clientsModel;
    constructor(agendamentoModel: Model<IAgendamento>, clientsModel: Model<ICliente>);
    criarHorario(data: CreateAgendamentoDto): Promise<import("mongoose").Document<unknown, {}, IAgendamento> & IAgendamento & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHorarios(): Promise<Omit<import("mongoose").Document<unknown, {}, IAgendamento> & IAgendamento & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    verificarDisponibilidade(date: string, horaInicio: string, horaTermino: string): Promise<boolean>;
    updateAgendamento(id: string, updateAgendamentoDto: updateAgendamentoDto): Promise<IAgendamento | null>;
    deleteAgendamento(id: string): Promise<IAgendamento | null>;
}
