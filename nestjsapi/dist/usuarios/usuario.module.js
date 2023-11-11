"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModule = void 0;
const common_1 = require("@nestjs/common");
const usuario_controller_1 = require("./usuario.controller");
const usuario_service_1 = require("./usuario.service");
const database_module_1 = require("../database/database.module");
const agendamento_providers_1 = require("../agendamentos/agendamento.providers");
const cliente_providers_1 = require("../clientes/cliente.providers");
const usuario_provider_1 = require("./usuario.provider");
let UsuarioModule = class UsuarioModule {
};
exports.UsuarioModule = UsuarioModule;
exports.UsuarioModule = UsuarioModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [usuario_controller_1.UsuarioController],
        providers: [usuario_service_1.UsuarioService, ...agendamento_providers_1.agendamentoProviders, ...cliente_providers_1.clienteProviders, ...usuario_provider_1.usuarioProviders],
    })
], UsuarioModule);
//# sourceMappingURL=usuario.module.js.map