"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('API do projeto ')
    .setDescription('Documentação da API para o gerenciamento do projeto')
    .setVersion('1.0')
    .build();
//# sourceMappingURL=openApi.config.js.map