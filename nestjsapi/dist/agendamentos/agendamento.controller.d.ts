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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto, updateAgendamentoDto } from './dto/agendamento.dto';
import { IAgendamento } from './interfaces/agendamento.interface';
export declare class AgendamentoController {
    private readonly agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    criarHorario(createAgendamentoDto: CreateAgendamentoDto): Promise<import("mongoose").Document<unknown, {}, IAgendamento> & IAgendamento & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getHorarios(): Promise<Omit<import("mongoose").Document<unknown, {}, IAgendamento> & IAgendamento & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    verificarDisponibilidade(date: string, horaInicio: string, horaTermino: string): Promise<boolean>;
    updateAgendamentoDto(id: string, updateAgendamentoDto: updateAgendamentoDto): Promise<IAgendamento>;
    deleteAgendamento(id: string): Promise<void>;
}
