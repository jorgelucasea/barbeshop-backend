import { Module, forwardRef } from "@nestjs/common";
import { ClientesResolver } from "./clientes.resolver";
import { ClientesService } from "./clientes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clientes } from "./models/cliente.model";
import { AgendamentosServices } from "src/agendamentos/agendamentos.service";
import { AgendamentosModule } from "src/agendamentos/agendamentos.module";

@Module({
    imports: [TypeOrmModule.forFeature([Clientes])],
    providers: [ClientesResolver, ClientesService],
    exports: [ClientesService, TypeOrmModule]
})

export class ClientesModule {}