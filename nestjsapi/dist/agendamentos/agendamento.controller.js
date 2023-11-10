"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendamentoController = void 0;
const common_1 = require("@nestjs/common");
const agendamento_service_1 = require("./agendamento.service");
const swagger_1 = require("@nestjs/swagger");
const agendamento_dto_1 = require("./dto/agendamento.dto");
let AgendamentoController = class AgendamentoController {
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    async criarHorario(createAgendamentoDto) {
        return await this.agendamentoService.criarHorario(createAgendamentoDto);
    }
    async getHorarios() {
        return await this.agendamentoService.getHorarios();
    }
    async verificarDisponibilidade(date, horaInicio, horaTermino) {
        return await this.agendamentoService.verificarDisponibilidade(date, horaInicio, horaTermino);
    }
};
exports.AgendamentoController = AgendamentoController;
__decorate([
    (0, common_1.Post)('agendamento'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo agendamento' }),
    (0, swagger_1.ApiBody)({ type: agendamento_dto_1.CreateAgendamentoDto, description: 'Dados para criar um novo agendamento' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agendamento_dto_1.CreateAgendamentoDto]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "criarHorario", null);
__decorate([
    (0, common_1.Get)('horarios'),
    (0, swagger_1.ApiOkResponse)({ type: [agendamento_dto_1.ResponseHorariosDto], description: 'Horarios encontrados' }),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém todos os horários disponíveis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "getHorarios", null);
__decorate([
    (0, common_1.Get)('disponibilidades'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica a disponibilidade de um horário' }),
    (0, swagger_1.ApiQuery)({ name: 'date', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'horaInicio', required: true, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'horaTermino', required: true, type: String }),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('horaInicio')),
    __param(2, (0, common_1.Query)('horaTermino')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "verificarDisponibilidade", null);
exports.AgendamentoController = AgendamentoController = __decorate([
    (0, common_1.Controller)('agendamentos'),
    (0, swagger_1.ApiTags)('Agendamentos'),
    __metadata("design:paramtypes", [agendamento_service_1.AgendamentoService])
], AgendamentoController);
//# sourceMappingURL=agendamento.controller.js.map