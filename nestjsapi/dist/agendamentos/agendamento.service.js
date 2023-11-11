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
exports.AgendamentoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let AgendamentoService = class AgendamentoService {
    constructor(agendamentoModel, clientsModel) {
        this.agendamentoModel = agendamentoModel;
        this.clientsModel = clientsModel;
    }
    async criarHorario(data) {
        try {
            const client = await this.clientsModel.findById(data.clientId);
            if (!client) {
                throw new Error('Cliente não encontrado');
            }
            const horarioExistente = await this.agendamentoModel.findOne({
                date: data.date,
                horaInicio: data.horaInicio,
                horaTermino: data.horaTermino,
            });
            if (horarioExistente) {
                throw new common_1.HttpException('O horário não está disponível, por favor escolha outro horário', common_1.HttpStatus.CONFLICT);
            }
            const novoHorario = await this.agendamentoModel.create(data);
            return novoHorario;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHorarios() {
        try {
            return this.agendamentoModel.find().populate('client', 'nomeCompleto contato');
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verificarDisponibilidade(date, horaInicio, horaTermino) {
        try {
            const horarioExistente = await this.agendamentoModel.findOne({
                date,
                horaInicio,
                horaTermino,
            });
            return !horarioExistente;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAgendamento(id, updateAgendamentoDto) {
        return await this.agendamentoModel.findByIdAndUpdate(id, updateAgendamentoDto);
    }
    async deleteAgendamento(id) {
        return await this.agendamentoModel.findByIdAndDelete(id).exec();
    }
};
exports.AgendamentoService = AgendamentoService;
exports.AgendamentoService = AgendamentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AGENDAMENTO_MODEL')),
    __param(1, (0, common_1.Inject)('CLIENTE_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], AgendamentoService);
//# sourceMappingURL=agendamento.service.js.map