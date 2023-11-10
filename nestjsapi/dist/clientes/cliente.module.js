"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModule = void 0;
const common_1 = require("@nestjs/common");
const cliente_controller_1 = require("./cliente.controller");
const cliente_service_1 = require("./cliente.service");
const agendamento_providers_1 = require("../agendamentos/agendamento.providers");
const cliente_providers_1 = require("./cliente.providers");
const database_module_1 = require("../database/database.module");
let ClienteModule = class ClienteModule {
};
exports.ClienteModule = ClienteModule;
exports.ClienteModule = ClienteModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [cliente_controller_1.ClienteController],
        providers: [cliente_service_1.ClienteService, ...cliente_providers_1.clienteProviders, ...agendamento_providers_1.agendamentoProviders],
    })
], ClienteModule);
//# sourceMappingURL=cliente.module.js.map