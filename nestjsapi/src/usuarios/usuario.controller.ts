import { CreateUsuarioDto, ResponseUsuarioDto, UpdateUsuarioDto, deleteUsuarioDto } from './dto/usuario.dto';
import { Controller, Get, Post, Put, Delete, Body, Query, Param, NotFoundException } from '@nestjs/common';
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

  @Put(':id')
  @ApiOperation({ summary: 'Para editar e atualizar informações do usuário' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateUsuarioDto, description: 'Para atualizar o usuário' })
  async UpdateUsuarioDto(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta o usuário' })
  @ApiBody({ type: deleteUsuarioDto, description: 'Deletar o usuário' })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteUsuario(@Param('id') id: string): Promise<void> {
    const usuario = await this.usuarioService.deleteUsuario(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não localizado');
    }
  }
}
