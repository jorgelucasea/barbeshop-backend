import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Repository } from 'typeorm';
import { NewClienteInput } from "./dto/new-cliente.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Clientes } from "./models/cliente.model";
import { UpdateClientInput } from "./dto/update-client.input";
import { Agendamentos } from "src/agendamentos/models/agendamento.model";
import { AgendamentosServices } from "src/agendamentos/agendamentos.service";

@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Clientes)
        private clientesRepository: Repository<Clientes>,
    ) {}
    
    async create(data: NewClienteInput): Promise<Clientes> {
        const cliente = this.clientesRepository.create(data);
        return this.clientesRepository.save(cliente);
    }

    async findById(id: number): Promise<Clientes> {
        return this.clientesRepository.findOne({
            where: {
                id
            },
            relations: ['agendamentos']
        });
    }

    async update(id: number, data: UpdateClientInput): Promise<Clientes> {
        await this.clientesRepository.update(id, data);
        return this.clientesRepository.findOne({
            where: {
                id
            },
            relations: ['agendamentos']
        });
    }

    async delete(id: number): Promise<Clientes> {
        const cliente = await this.clientesRepository.findOne({
            where: {
                id
            }
        });
        await this.clientesRepository.delete(id);
        return cliente;
    }

    async findAll(): Promise<Clientes[]> {
        return this.clientesRepository.find({relations: ['agendamentos']});

    }
}