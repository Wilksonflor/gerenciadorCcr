import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateAgendamentoDto } from './agendamentos.dto';


@Controller('agendamento')
@ApiTags('Agendamento') // Define as tags para a documentação
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('novoAgendamento')
  @ApiOperation({ summary: 'Cria um novo agendamento' })
  @ApiBody({ type: CreateAgendamentoDto }) 
  async criarHorario(@Body() body: CreateAgendamentoDto) {
    try {
      const novoHorario = await this.agendamentoService.criarHorario(body);
      return { message: 'Horário agendado com sucesso', novoHorario };
    } catch (error) {
      return { message: 'Erro ao criar horário', error };
    }
  }

  @Get('horarios')
  @ApiOperation({ summary: 'Obtém todos os horários disponíveis' })
  async getHorarios() {
    try {
      const horarios = await this.agendamentoService.getHorarios();
      return horarios;
    } catch (error) {
      return { message: 'Erro ao recuperar os horários', error };
    }
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
    try {
      const disponivel = await this.agendamentoService.verificarDisponibilidade(
        date,
        horaInicio,
        horaTermino,
      );
      return { disponivel };
    } catch (error) {
      return { message: 'Erro ao verificar disponibilidade', error };
    }
  }
}
