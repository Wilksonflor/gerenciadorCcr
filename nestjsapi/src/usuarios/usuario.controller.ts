import { CreateUsuarioDto, ResponseUsuarioDto } from './dto/usuario.dto';
import { Controller, Get, Post, Put, Body, Query, Param, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBody, ApiOkResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
@ApiTags('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('new-user')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUsuarioDto, description: 'Informações para criar um novo cliente' })
  async criarCliente(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.criarUsuario(createUsuarioDto);
  }

  @Get('')
  @ApiOkResponse({ type: [ResponseUsuarioDto], description: 'Usuários Encontrados' })
  @ApiOperation({ summary: 'Obtém todos os usuários' })
  async getUsuarios() {
    return await this.usuarioService.getUsuarios();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Localiza o usuário através do ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ResponseUsuarioDto, description: 'Usuário licalizado' })
  async getUsuarioById(@Param('id') id: string) {
    try {
      const user = await this.usuarioService.getUsuarioById(id);
      if (!user) {
        throw new NotFoundException('Cliente não localizado');
      }
      return user;
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }

  
}
