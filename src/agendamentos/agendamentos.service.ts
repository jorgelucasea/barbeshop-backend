import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agendamentos } from "./models/agendamento.model";
import { Repository } from 'typeorm';
import { NewAgendamentoInput } from "./dto/new-agendamento.input";
import { ClientesService } from "src/clientes/clientes.service";
import { Clientes } from "src/clientes/models/cliente.model";
import { Barbeiros } from "src/barbeiros/models/barbeiro.model";

@Injectable()
export class AgendamentosServices {
    constructor(
        @InjectRepository(Agendamentos)
        private agendamentosRepository: Repository<Agendamentos>,
        private readonly clientesService: ClientesService
    ) {}

    async findClientByAppointmentId(id: number) {
        const cliente = await this.clientesService.findById(id)
        if(!cliente) {
            throw new Error(`Client not found for appointment with ID ${id}`);
        }
        
        return cliente;
    }

    async create(data: NewAgendamentoInput): Promise<Agendamentos> {
        const agendamento =  this.agendamentosRepository.create(data);

        agendamento.cliente = { id: data.cliente_id } as Clientes;
        agendamento.barbeiro = { id: data.barbeiro_id } as Barbeiros;

        return this.agendamentosRepository.save(agendamento);
    }

    async findAll(): Promise<Agendamentos[]> {
        return await this.agendamentosRepository.find({relations: ['cliente']});
    }

    async findById(id: number): Promise<Agendamentos> {
        return await this.agendamentosRepository.findOne({
            where: {
                id
            },
            relations: ['cliente'],
        });
    }
}