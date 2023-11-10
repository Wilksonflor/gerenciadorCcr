import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { CreateAgendamentoDto, ResponseHorariosDto } from './dto/agendamento.dto';

@Controller('agendamentos')
@ApiTags('Agendamentos') 
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('novoAgendamento')
  @ApiOperation({ summary: 'Cria um novo agendamento' })
  @ApiBody({ type: CreateAgendamentoDto, description: 'Dados para criar um novo agendamento' })
  async criarHorario(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return await this.agendamentoService.criarHorario(createAgendamentoDto);
  }
// Para listar os horários
  @Get('horarios')
  @ApiOkResponse({ type: [ResponseHorariosDto], description: 'Horarios encontrados' })
  @ApiOperation({ summary: 'Obtém todos os horários disponíveis' })
  async getHorarios() {
    return await this.agendamentoService.getHorarios();
  }

  @Get('verificarDisponibilidade')
  @ApiOperation({ summary: 'Verifica a disponibilidade de um horário' })
  @ApiQuery({ name: 'date', required: true, type: String })
  @ApiQuery({ name: 'horaInicio', required: true, type: String })
  @ApiQuery({ name: 'horaTermino', required: true, type: String })
  async verificarDisponibilidade(
    @Query('date') date: string,
    @Query('horaInicio') horaInicio: string,
    @Query('horaTermino') horaTermino: string,
  ) {
    return await this.agendamentoService.verificarDisponibilidade(date, horaInicio, horaTermino);
  }
}
