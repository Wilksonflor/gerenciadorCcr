import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './agendamentos.dto';
export declare class AgendamentoController {
    private readonly agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    criarHorario(body: CreateAgendamentoDto): Promise<{
        message: string;
        novoHorario: any;
        error?: undefined;
    } | {
        message: string;
        error: any;
        novoHorario?: undefined;
    }>;
    getHorarios(): Promise<Omit<any, never>[] | {
        message: string;
        error: any;
    }>;
    verificarDisponibilidade(date: string, horaInicio: string, horaTermino: string): Promise<{
        disponivel: boolean;
        message?: undefined;
        error?: undefined;
    } | {
        message: string;
        error: any;
        disponivel?: undefined;
    }>;
}
