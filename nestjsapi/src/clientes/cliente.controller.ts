import { Controller /*, Get, Post, Body, Query*/ } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ApiTags /*, ApiOperation, ApiBody, ApiQuery*/ } from '@nestjs/swagger';
//import { CreateAgendamentoDto } from './dto/agendamento.dto';

@Controller('clientes')
@ApiTags('Cliente') // Define as tags para a documentação
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}
}
