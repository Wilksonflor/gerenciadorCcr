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
exports.UsuarioController = void 0;
const usuario_dto_1 = require("./dto/usuario.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuario_service_1 = require("./usuario.service");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async criarCliente(createUsuarioDto) {
        return await this.usuarioService.criarUsuario(createUsuarioDto);
    }
    async getUsuarios() {
        return await this.usuarioService.getUsuarios();
    }
    async getUsuarioById(id) {
        try {
            const user = await this.usuarioService.getUsuarioById(id);
            if (!user) {
                throw new common_1.NotFoundException('Cliente não localizado');
            }
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Post)('new-user'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo usuário' }),
    (0, swagger_1.ApiBody)({ type: usuario_dto_1.CreateUsuarioDto, description: 'Informações para criar um novo cliente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuario_dto_1.CreateUsuarioDto]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "criarCliente", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({ type: [usuario_dto_1.ResponseUsuarioDto], description: 'Usuários Encontrados' }),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém todos os usuários' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getUsuarios", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Localiza o usuário através do ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiOkResponse)({ type: usuario_dto_1.ResponseUsuarioDto, description: 'Usuário licalizado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getUsuarioById", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, common_1.Controller)('usuarios'),
    (0, swagger_1.ApiTags)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map