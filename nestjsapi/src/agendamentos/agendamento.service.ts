import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Agendamento } from './agendamento.model';
import { Clients } from '../clientes/cliente.model';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectModel(Agendamento.name) private readonly agendamentoModel: Model<Agendamento>,
    @InjectModel(Clients.name) private readonly clientsModel: Model<Clients>,
  ) {}

  async criarHorario(data: Agendamento) {
    try {
     
      const client = await this.clientsModel.findOne({ nomeCompleto: data.clientId });

      if (!client) {
        throw new Error('Cliente não encontrado');
      }

      const horarioExistente = await this.agendamentoModel.findOne({
        date: data.date,
        horaInicio: data.horaInicio,
        horaTermino: data.horaTermino,
      });

      if (horarioExistente) {
        throw new Error('O horário não está disponível, por favor escolha outro horário');
      }

      const novoHorario = await this.agendamentoModel.create(data);

      return novoHorario;
    } catch (error) {
      throw error;
    }
  }

  async getHorarios() {
    try {
     
      return this.agendamentoModel.find().populate('client', 'nomeCompleto contato');
    } catch (error) {
      throw error;
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
      throw error;
    }
  }
}
