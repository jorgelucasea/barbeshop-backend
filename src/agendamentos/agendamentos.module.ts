import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agendamentos } from "./models/agendamento.model";
import { AgendamentosResolver } from "./agendamentos.resolver";
import { AgendamentosServices } from "./agendamentos.service";
import { ClientesModule } from "src/clientes/clientes.module";
import { NewAgendamentoInput } from "./dto/new-agendamento.input";
import { BarbeirosModule } from "src/barbeiros/barbeiros.module";

@Module({
    imports: [TypeOrmModule.forFeature([Agendamentos]), ClientesModule, BarbeirosModule],
    providers: [AgendamentosResolver, AgendamentosServices],
})

export class AgendamentosModule {}