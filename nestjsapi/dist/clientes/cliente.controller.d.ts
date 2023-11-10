import { ClienteService } from './cliente.service';
import { CreateClienteDto, UpdateClienteDto } from './dto/cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    criarCliente(createClienteDto: CreateClienteDto): Promise<import("./interfaces/cliente.interface").ICliente>;
    getClientes(): Promise<import("./interfaces/cliente.interface").ICliente[]>;
    getClienteById(id: string): Promise<import("./interfaces/cliente.interface").ICliente>;
    updateCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<import("./interfaces/cliente.interface").ICliente>;
    deleteCliente(id: string): Promise<void>;
}
