"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const openApi_config_1 = require("./openApi.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const document = swagger_1.SwaggerModule.createDocument(app, openApi_config_1.swaggerConfig);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map