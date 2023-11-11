import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgendamentoDto, updateAgendamentoDto, DeleteAgendamentoDto } from './dto/agendamento.dto';
import { IAgendamento } from './interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
import { UpdateClienteDto } from 'src/clientes/dto/cliente.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @Inject('AGENDAMENTO_MODEL') private readonly agendamentoModel: Model<IAgendamento>,
    @Inject('CLIENTE_MODEL') private readonly clientsModel: Model<ICliente>,
  ) {}

  async criarHorario(data: CreateAgendamentoDto) {
    try {
      // const client = await this.clientsModel.findOne({ nomeCompleto: data.clientId });
      const client = await this.clientsModel.findById(data.clientId);

      if (!client) {
        throw new Error('Cliente não encontrado');
      }

      const horarioExistente = await this.agendamentoModel.findOne({
        date: data.date,
        horaInicio: data.horaInicio,
        horaTermino: data.horaTermino,
      });

      if (horarioExistente) {
        throw new HttpException('O horário não está disponível, por favor escolha outro horário', HttpStatus.CONFLICT);
      }

      const novoHorario = await this.agendamentoModel.create(data);

      return novoHorario;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getHorarios() {
    try {
      return this.agendamentoModel.find().populate('client', 'nomeCompleto contato');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async verificarDisponibilidade(date: string, horaInicio: string, horaTermino: string) {
    try {
      // Verifique a disponibilidade com base na data e horários fornecidos
      const horarioExistente = await this.agendamentoModel.findOne({
        date,
        horaInicio,
        horaTermino,
      });
      return !horarioExistente; // Se não houver horário existente, está disponível
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAgendamento(id: string, updateAgendamentoDto: updateAgendamentoDto): Promise<IAgendamento | null> {
    return await this.agendamentoModel.findByIdAndUpdate(id, updateAgendamentoDto);
  }

  async deleteAgendamento(id: string): Promise<IAgendamento | null> {
    return await this.agendamentoModel.findByIdAndDelete(id).exec();
  }
}
