import { Model } from 'mongoose';
import { ICliente } from '../clientes/interfaces/cliente.interface';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';
export declare class ClienteService {
    private readonly clienteModel;
    constructor(clienteModel: Model<ICliente>);
    criarCliente(createClienteDto: CreateClienteDto): Promise<ICliente>;
    getClientes(): Promise<ICliente[]>;
    updateCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ICliente | null>;
}
