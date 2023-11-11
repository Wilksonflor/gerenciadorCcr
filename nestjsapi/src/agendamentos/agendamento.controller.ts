import { Controller, Get, Post, Put, Delete, Body, Query, Param, NotFoundException } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateAgendamentoDto,
  ResponseHorariosDto,
  DeleteAgendamentoDto,
  updateAgendamentoDto,
} from './dto/agendamento.dto';
import { IAgendamento } from './interfaces/agendamento.interface';

@Controller('agendamentos')
@ApiTags('Agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('agendamento')
  @ApiOperation({ summary: 'Cria um novo agendamento' })
  @ApiBody({ type: CreateAgendamentoDto, description: 'Dados para criar um novo agendamento' })
  async criarHorario(@Body() createAgendamentoDto: CreateAgendamentoDto) {
    return await this.agendamentoService.criarHorario(createAgendamentoDto);
  }

  @Get('horarios')
  @ApiOkResponse({ type: [ResponseHorariosDto], description: 'Horarios encontrados' })
  @ApiOperation({ summary: 'Obtém todos os horários disponíveis' })
  async getHorarios() {
    return await this.agendamentoService.getHorarios();
  }

  @Get('disponibilidades')
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

  @Put(':id')
  @ApiOperation({ summary: 'Edita e Atualiza o agendamento' })
  @ApiBody({ type: updateAgendamentoDto, description: 'Atualiza e edita o agendamento' })
  @ApiParam({ name: 'id', type: 'string' })
  async updateAgendamentoDto(@Param('id') id: string, @Body() updateAgendamentoDto: updateAgendamentoDto) {
    return await this.agendamentoService.updateAgendamento(id, updateAgendamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um horário agendado' })
  @ApiBody({ type: DeleteAgendamentoDto, description: 'Deleta um horário' })
  @ApiParam({ name: 'id', type: 'string' })
  async deleteAgendamento(@Param('id') id: string): Promise<void> {
    const agendamento = await this.agendamentoService.deleteAgendamento(id);
    if (!agendamento) {
      throw new NotFoundException('Horário não encontrado');
    }
  }
}
