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
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let UsuarioService = class UsuarioService {
    constructor(agendamentoModel, clientsModel, usuarioModel) {
        this.agendamentoModel = agendamentoModel;
        this.clientsModel = clientsModel;
        this.usuarioModel = usuarioModel;
    }
    async criarUsuario(data) {
        try {
            const user = await this.usuarioModel.create({
                nomeCompleto: data.nomeCompleto,
                contato: data.contato,
                username: data.username,
                password: data.password,
            });
            console.log(user);
        }
        catch (error) {
            throw new common_1.HttpException('Falha ao criar o usuário', common_1.HttpStatus.CONFLICT);
        }
    }
    async getUsuarios() {
        try {
            return this.usuarioModel.find();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUsuarioById(id) {
        return this.usuarioModel.findById(id);
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('AGENDAMENTO_MODEL')),
    __param(1, (0, common_1.Inject)('CLIENTE_MODEL')),
    __param(2, (0, common_1.Inject)('USUARIO_MODEL')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Model])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map