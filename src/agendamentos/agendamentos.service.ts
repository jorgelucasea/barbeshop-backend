import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agendamentos } from "./models/agendamento.model";
import { Repository } from 'typeorm';
import { NewAgendamentoInput } from "./dto/new-agendamento.input";
import { ClientesService } from "src/clientes/clientes.service";
import { Clientes } from "src/clientes/models/cliente.model";
import { Barbeiros } from "src/barbeiros/models/barbeiro.model";
import { BarbeirosService } from "src/barbeiros/barbeiros.service";

@Injectable()
export class AgendamentosServices {
    constructor(
        @InjectRepository(Agendamentos)
        private agendamentosRepository: Repository<Agendamentos>,
        private readonly clientesService: ClientesService,
        private readonly barbeirosService: BarbeirosService,
    ) {}

    async findBarbeiroByAppointmentId(id: number) {
        const barbeiro = await this.barbeirosService.findById(id)
        if(!barbeiro) {
            throw new Error(`Barbeiro not found for appointment with ID ${id}`);
        }
        
        return barbeiro;
    }

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
        return await this.agendamentosRepository.find({relations: ['cliente', 'barbeiro']});
    }

    async findById(id: number): Promise<Agendamentos> {
        return await this.agendamentosRepository.findOne({
            where: {
                id
            },
            relations: ['cliente', 'barbeiro'],
        });
    }
}