import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_MODEL') private readonly clienteModel: Model<ICliente>,
  ) {}

  async criarCliente(createClienteDto: CreateClienteDto): Promise<ICliente> {
    const novoCliente = new this.clienteModel(createClienteDto);
    return await novoCliente.save();
  }

  async getClientes(): Promise<ICliente[]> {
    return await this.clienteModel.find().exec();
  }

  async updateCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ICliente | null> {
    return await this.clienteModel.findByIdAndUpdate(id,updateClienteDto, {new: true}).exec();
  }
}

