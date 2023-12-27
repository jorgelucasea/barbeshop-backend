import { Args, Resolver, Query, Mutation} from "@nestjs/graphql";
import { Barbeiros } from "./models/barbeiro.model";
import { BarbeirosService } from "./barbeiros.service";
import { NotFoundException } from "@nestjs/common";
import { NewBabeiroInput } from "./dto/new-barbeiro.input";

@Resolver(of => Barbeiros)
export class BarbeirosResolver {
    constructor(
        private readonly barbeirosService: BarbeirosService
    ) {}

    @Query(returns => Barbeiros)
    async barbeiro(@Args('id') id: number): Promise<Barbeiros> {
        const barbeiro = await this.barbeirosService.findById(id);
        if(!barbeiro) {
            throw new NotFoundException(`Barbeiro with id ${id} not found`, 'BARBEIRO_NOT_FOUND');
        }

        return barbeiro;
    }

    @Query(returns => [Barbeiros])
    async barbeiros(): Promise<Barbeiros[]> {
        return this.barbeirosService.findAll();
    }

    @Mutation(returns => Barbeiros)
    async addBarbeiro(
        @Args('newBarbeiroData') newBarbeiroData: NewBabeiroInput,
    ): Promise<Barbeiros> {
        const barbeiro = await this.barbeirosService.create(newBarbeiroData);
        return barbeiro;
    }
}