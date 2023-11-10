import { Model } from 'mongoose';
import { ICliente } from './interfaces/cliente.interface';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';
export declare class ClienteService {
    private readonly clienteModel;
    constructor(clienteModel: Model<ICliente>);
    criarCliente(createClienteDto: CreateClienteDto): Promise<ICliente>;
    getClientes(): Promise<ICliente[]>;
    getClienteById(id: string): Promise<ICliente | null>;
    updateCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ICliente | null>;
    deleteCliente(id: string): Promise<ICliente | null>;
}
