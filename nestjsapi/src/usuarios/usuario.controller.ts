import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('usuarios')
@ApiTags('usuario') 
export class UsuarioController {}
