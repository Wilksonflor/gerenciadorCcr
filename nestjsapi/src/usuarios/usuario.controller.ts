import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('usuarios')
@ApiTags('usuario') // Define as tags para a documentação
export class UsuarioController {}
