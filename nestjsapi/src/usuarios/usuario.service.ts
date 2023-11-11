import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { IAgendamento } from '../agendamentos/interfaces/agendamento.interface';
import { ICliente } from '../clientes/interfaces/cliente.interface';
import { IUsuario } from './interfaces/usuario.interface';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @Inject('AGENDAMENTO_MODEL') private readonly agendamentoModel: Model<IAgendamento>,
    @Inject('CLIENTE_MODEL') private readonly clientsModel: Model<ICliente>,
    @Inject('USUARIO_MODEL') private readonly usuarioModel: Model<IUsuario>,
  ) {}

  async criarUsuario(data: CreateUsuarioDto) {
    try {
      const user = await this.usuarioModel.create({
        nomeCompleto: data.nomeCompleto,
        contato: data.contato,
        username: data.username,
        password: data.password,
      });
      console.log(user);
    } catch (error) {
      throw new HttpException('Falha ao criar o usuário', HttpStatus.CONFLICT);
    }
  }

  async getUsuarios() {
    try {
      return this.usuarioModel.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUsuarioById(id: string): Promise<IUsuario | null> {
    return this.usuarioModel.findById(id);
  }

  async updateUsuario(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<IUsuario | null> {
    return await this.usuarioModel
      .findByIdAndUpdate(id, updateUsuarioDto, {
        new: true,
      })
      .exec();
  }

  async deleteUsuario(id: string): Promise<IUsuario | null> {
    return await this.usuarioModel.findByIdAndDelete(id).exec();
  }
}
