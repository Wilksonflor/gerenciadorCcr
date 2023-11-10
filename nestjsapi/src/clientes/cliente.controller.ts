import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { CreateClienteDto, ResponseClienteDto, UpdateClienteDto } from './dto/cliente.dto';


@Controller('clientes')
@ApiTags('Cliente') 
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('novoCliente')
  @ApiOperation({summary: 'Cria um novo cliente' })
  @ApiBody({type: CreateClienteDto, description: 'Dados para criar um novo cliente'})
  async criarCliente(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.criarCliente(createClienteDto);
  }

  @Get('cliente')
  @ApiOkResponse({ type: [ResponseClienteDto], description: 'Clientes encontrados' })
  @ApiOperation({ summary: 'Obtém todos os clientes'})
  async getClientes(){
    return await this.clienteService.getClientes();
  }
  
  @Put('atualizarCliente/:id')
  @ApiOperation({ summary: 'Atualiza um cliente existente' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateClienteDto, description: 'Dados para atualizar um cliente' })
  async updateCliente(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return await this.clienteService.updateCliente(id, updateClienteDto);
  }

}
