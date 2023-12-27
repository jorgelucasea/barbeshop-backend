import { Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { NewClienteInput } from './dto/new-cliente.input';
import { ClienteModel } from './models/cliente.model';
import { Cliente } from 'src/repository/clientes.entity';
import { UpdateClientInput } from './dto/update-client.input';

@Resolver(of => ClienteModel)
export class ClientesResolver {
    constructor(private readonly clientesService: ClientesService) {}

    @Query(returns => [ClienteModel])
    async clientes(): Promise<Cliente[]> {
        return this.clientesService.findAll();
    }

    @Query(returns => ClienteModel)
    async cliente(@Args('id') id: number): Promise<Cliente> {
        const cliente = await this.clientesService.findById(id);
        if(!cliente) {
            throw new NotFoundException(`Cliente with id ${id} not found`, 'CLIENTE_NOT_FOUND');
        }

        return cliente;
    }
    
    @Mutation(returns => ClienteModel)
    async addCliente(
        @Args('newClienteData') newClienteData: NewClienteInput,
    ): Promise<Cliente> {
        const cliente = await this.clientesService.create(newClienteData);
        return cliente;
    }

    @Mutation(returns => ClienteModel)
    async updateCliente(
        @Args('id') id: number,
        @Args('newClienteData') newClienteData: UpdateClientInput,
    ): Promise<Cliente> {
        return this.clientesService.update(id, newClienteData);
    }

    @Mutation(returns => ClienteModel)
    async deleteCliente(
        @Args('id') id: number,
    ): Promise<Cliente> {
        return this.clientesService.delete(id);
    }
}