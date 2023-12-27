import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { NewClienteInput } from "./dto/new-cliente.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from '../repository/clientes.entity';

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Cliente)
        private clientesRepository: Repository<Cliente>,
    ) {}
    
    async create(data: NewClienteInput): Promise<Cliente> {
        const cliente = this.clientesRepository.create(data);
        return this.clientesRepository.save(cliente);
    }

    async findAll(): Promise<Cliente[]> {
        return this.clientesRepository.find();
    }
}