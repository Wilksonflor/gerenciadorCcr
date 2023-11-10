import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateClienteDto, DeleteClienteDto, ResponseClienteDto, UpdateClienteDto } from './dto/cliente.dto';

@Controller('clientes')
@ApiTags('Clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('novoCliente')
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiBody({ type: CreateClienteDto, description: 'Dados para criar um novo cliente' })
  async criarCliente(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.criarCliente(createClienteDto);
  }

  @Get('')
  @ApiOkResponse({ type: [ResponseClienteDto], description: 'Clientes encontrados' })
  @ApiOperation({ summary: 'Obtém todos os clientes' })
  async getClientes() {
    return await this.clienteService.getClientes();
  }

  @Get('/cliente/:id')
  @ApiOperation({ summary: 'Obtém os dados de um cliente específico' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ type: ResponseClienteDto, description: 'Cliente localizado' })
  async getClienteById(@Param('id') id: string) {
    const cliente = await this.clienteService.getClienteById(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente não encontrado`);
    }
    return cliente;
  }

  @Put('atualizarCliente/:id')
  @ApiOperation({ summary: 'Atualiza um cliente existente' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateClienteDto, description: 'Dados para atualizar um cliente' })
  async updateCliente(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return await this.clienteService.updateCliente(id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete um cliente especifico' })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteCliente(@Param('id') id: string): Promise<void> {
    const cliente = await this.clienteService.getClienteById(id);
    if (!cliente) {
      throw new NotFoundException('Cliente não localizado');
    }
    await this.clienteService.deleteCliente(id);
  }
}
