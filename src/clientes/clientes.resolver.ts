import { Resolver, Mutation, Args, Query} from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { NewClienteInput } from './dto/new-cliente.input';
import { ClienteModel } from './models/cliente.model';
import { Cliente } from 'src/repository/clientes.entity';

@Resolver(of => ClienteModel)
export class ClientesResolver {
    constructor(private readonly clientesService: ClientesService) {}

    @Query(returns => [ClienteModel])
    async clientes(): Promise<Cliente[]> {
        return this.clientesService.findAll();
    }

    @Mutation(returns => ClienteModel)
    async addCliente(
        @Args('newClienteData') newClienteData: NewClienteInput,
    ): Promise<Cliente> {
        const cliente = await this.clientesService.create(newClienteData);
        return cliente;
    }
}