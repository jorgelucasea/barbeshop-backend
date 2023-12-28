import { HttpException, HttpStatus , Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Agendamentos } from "./models/agendamento.model";
import { Repository, Between } from 'typeorm';
import { NewAgendamentoInput } from "./dto/new-agendamento.input";
import { ClientesService } from "src/clientes/clientes.service";
import { Clientes } from "src/clientes/models/cliente.model";
import { Barbeiros } from "src/barbeiros/models/barbeiro.model";
import { BarbeirosService } from "src/barbeiros/barbeiros.service";
import { BarberService } from "./models/agendamento-servicos.enum";


@Injectable()
export class AgendamentosServices {

    private readonly logger = new Logger(AgendamentosServices.name);

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
        // "2023-12-29T14:30:00Z" -> Formato
        const agendamento =  this.agendamentosRepository.create(data);
        let duration = 0;
        for (const iterator of agendamento.servico) {
            duration += await this.getServiceDuration(iterator);
        }

        const inicio = agendamento.date;
        const fim = new Date(inicio.getTime() + (duration * (59/60)) * 60 * 1000); // supondo que a duração seja em minutos
        
       if(!await this.isBarberAvailable(inicio, fim, data.barbeiro_id)) {
            throw new Error(`Barber not available for appointment with ID ${fim}`);
       }

        agendamento.cliente = { id: data.cliente_id } as Clientes;
        agendamento.barbeiro = { id: data.barbeiro_id } as Barbeiros;
        agendamento.horario_fim = fim;

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

    async isBarberAvailable(inicio: Date, fim: Date, barbeiroId: number) {
        const agendamentosDoDia = await this.agendamentosRepository.find({
            where: {
                date: Between(inicio, fim),
                barbeiro: { id: barbeiroId },
            }
        });
    
        const agendamentosComFimNoIntervalo = await this.agendamentosRepository.find({
            where: {
                horario_fim: Between(inicio, fim),
                barbeiro: { id: barbeiroId },
            }
        });
    
        if(agendamentosDoDia.length > 0 || agendamentosComFimNoIntervalo.length > 0) {
            this.logger.log(`Agendamentos do dia: ${JSON.stringify(agendamentosDoDia)} e ${JSON.stringify(agendamentosComFimNoIntervalo)}`);
            return false
        }

        return true
    }

    async getServiceDuration(service: BarberService) {
        switch (service) {
            case BarberService.CABELO:
                return 30;
            case BarberService.BARBA:
                return 30;
            case BarberService.BARBA_E_CABELO:
                return 60;
            case BarberService.PINTAR:
                return 60;
        }
    }
}