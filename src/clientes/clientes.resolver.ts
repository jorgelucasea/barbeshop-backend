import { Resolver, Mutation, Args, Query, ResolveField, Parent} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { NewClienteInput } from './dto/new-cliente.input';
import { Clientes } from './models/cliente.model';
import { UpdateClientInput } from './dto/update-client.input';
import { Agendamentos } from 'src/agendamentos/models/agendamento.model';

@Resolver(of => Clientes)
export class ClientesResolver {
    constructor(private readonly clientesService: ClientesService) {}

    @Query(returns => [Clientes])
    async clientes(): Promise<Clientes[]> {
        return this.clientesService.findAll();
    }

    @Query(returns => Clientes)
    async cliente(@Args('id') id: number): Promise<Clientes> {
        const cliente = await this.clientesService.findById(id);
        if(!cliente) {
            throw new NotFoundException(`Cliente with id ${id} not found`, 'CLIENTE_NOT_FOUND');
        }

        return cliente;
    }
    
    @Mutation(returns => Clientes)
    async addCliente(
        @Args('newClienteData') newClienteData: NewClienteInput,
    ): Promise<Clientes> {
        const cliente = await this.clientesService.create(newClienteData);
        return cliente;
    }

    @Mutation(returns => Clientes)
    async updateCliente(
        @Args('id') id: number,
        @Args('newClienteData') newClienteData: UpdateClientInput,
    ): Promise<Clientes> {
        return this.clientesService.update(id, newClienteData);
    }

    @Mutation(returns => Clientes)
    async deleteCliente(
        @Args('id') id: number,
    ): Promise<Clientes> {
        return this.clientesService.delete(id);
    }
}