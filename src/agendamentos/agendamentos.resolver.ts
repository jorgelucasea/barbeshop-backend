import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { Agendamentos } from "./models/agendamento.model";
import { AgendamentosServices } from "./agendamentos.service";
import { NewAgendamentoInput } from "./dto/new-agendamento.input";
import { Clientes } from "src/clientes/models/cliente.model";
import { Logger } from '@nestjs/common';


@Resolver(of => Agendamentos)
export class AgendamentosResolver {
    constructor(private readonly agendamentoService: AgendamentosServices) {}

    private readonly logger = new Logger(AgendamentosResolver.name);

    @ResolveField('clientes', returns => Clientes)
    async getCliente(@Parent() agendamento: Agendamentos) {
        const { id } = agendamento;
        this.logger.log(`id: ${id}`, agendamento.cliente.id);
        const cliente = await this.agendamentoService.findClientByAppointmentId(agendamento.cliente.id);
        if (!cliente) {
            // Handle the case where the client is not found - either log, throw an error, or decide on a valid approach
            throw new Error(`Client not found for appointment with ID ${agendamento.id}`);
        }
  
        return cliente;
    }

    @Query(returns => [Agendamentos])
    async agendamentos() {
        return await this.agendamentoService.findAll();
    }

    @Query(returns => Agendamentos)
    async agendamento(@Args('id') id: number) {
        return await this.agendamentoService.findById(id);
    }

    @Mutation(returns => Agendamentos)
    async addAgendamento(@Args('agendamentoInput') data: NewAgendamentoInput) {
        return await this.agendamentoService.create(data);
    }
}