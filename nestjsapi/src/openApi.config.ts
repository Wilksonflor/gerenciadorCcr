import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API do projeto ')
  .setDescription('Documentação da API para o gerenciamento do projeto')
  .setVersion('1.0')
  .build();
