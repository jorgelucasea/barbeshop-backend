import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { NewClienteInput } from "./dto/new-cliente.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Cliente } from '../repository/clientes.entity';
import { UpdateClientInput } from "./dto/update-client.input";

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

    async findById(id: number): Promise<Cliente> {
        return this.clientesRepository.findOne({
            where: {
                id
            }
        });
    }

    async update(id: number, data: UpdateClientInput): Promise<Cliente> {
        await this.clientesRepository.update(id, data);
        return this.clientesRepository.findOne({
            where: {
                id
            }
        });
    }

    async delete(id: number): Promise<Cliente> {
        const cliente = await this.clientesRepository.findOne({
            where: {
                id
            }
        });
        await this.clientesRepository.delete(id);
        return cliente;
    }

    async findAll(): Promise<Cliente[]> {
        return this.clientesRepository.find();
    }
}