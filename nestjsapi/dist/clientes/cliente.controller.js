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
exports.ClienteController = void 0;
const common_1 = require("@nestjs/common");
const cliente_service_1 = require("./cliente.service");
const swagger_1 = require("@nestjs/swagger");
const cliente_dto_1 = require("./dto/cliente.dto");
let ClienteController = class ClienteController {
    constructor(clienteService) {
        this.clienteService = clienteService;
    }
    async criarCliente(createClienteDto) {
        return await this.clienteService.criarCliente(createClienteDto);
    }
    async getClientes() {
        return await this.clienteService.getClientes();
    }
    async getClienteById(id) {
        const cliente = await this.clienteService.getClienteById(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente não encontrado`);
        }
        return cliente;
    }
    async updateCliente(id, updateClienteDto) {
        return await this.clienteService.updateCliente(id, updateClienteDto);
    }
    async deleteCliente(id) {
        const cliente = await this.clienteService.getClienteById(id);
        if (!cliente) {
            throw new common_1.NotFoundException('Cliente não localizado');
        }
        await this.clienteService.deleteCliente(id);
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)('novoCliente'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo cliente' }),
    (0, swagger_1.ApiBody)({ type: cliente_dto_1.CreateClienteDto, description: 'Dados para criar um novo cliente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "criarCliente", null);
__decorate([
    (0, common_1.Get)(''),
    (0, swagger_1.ApiOkResponse)({ type: [cliente_dto_1.ResponseClienteDto], description: 'Clientes encontrados' }),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém todos os clientes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getClientes", null);
__decorate([
    (0, common_1.Get)('/cliente/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtém os dados de um cliente específico' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiOkResponse)({ type: cliente_dto_1.ResponseClienteDto, description: 'Cliente localizado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "getClienteById", null);
__decorate([
    (0, common_1.Put)('atualizarCliente/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um cliente existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiBody)({ type: cliente_dto_1.UpdateClienteDto, description: 'Dados para atualizar um cliente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "updateCliente", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete um cliente especifico' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "deleteCliente", null);
exports.ClienteController = ClienteController = __decorate([
    (0, common_1.Controller)('clientes'),
    (0, swagger_1.ApiTags)('Clientes'),
    __metadata("design:paramtypes", [cliente_service_1.ClienteService])
], ClienteController);
//# sourceMappingURL=cliente.controller.js.map