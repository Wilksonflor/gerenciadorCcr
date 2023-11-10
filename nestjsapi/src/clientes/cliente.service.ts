import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from './interfaces/cliente.interface';
import { CreateClienteDto, DeleteClienteDto, UpdateClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(@Inject('CLIENTE_MODEL') private readonly clienteModel: Model<ICliente>) {}

  async criarCliente(createClienteDto: CreateClienteDto): Promise<ICliente> {
    const novoCliente = new this.clienteModel(createClienteDto);
    return await novoCliente.save();
  }

  async getClientes(): Promise<ICliente[]> {
    return await this.clienteModel.find().exec();
  }

  async getClienteById(id: string): Promise<ICliente | null> {
    return await this.clienteModel.findById(id).exec();
  }

  async updateCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ICliente | null> {
    return await this.clienteModel.findByIdAndUpdate(id, updateClienteDto, { new: true }).exec();
  }

  async deleteCliente(id: string): Promise<ICliente | null> {
    return await this.clienteModel.findByIdAndDelete(id).exec();
  }
}
