import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Agendamentos } from "./models/agendamento.model";
import { AgendamentosResolver } from "./agendamentos.resolver";
import { AgendamentosServices } from "./agendamentos.service";
import { ClientesModule } from "src/clientes/clientes.module";
import { NewAgendamentoInput } from "./dto/new-agendamento.input";

@Module({
    imports: [TypeOrmModule.forFeature([Agendamentos]), ClientesModule],
    providers: [AgendamentosResolver, AgendamentosServices],
})

export class AgendamentosModule {}