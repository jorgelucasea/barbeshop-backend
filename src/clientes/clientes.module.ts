import { Module } from "@nestjs/common";
import { ClientesResolver } from "./clientes.resolver";
import { ClientesService } from "./clientes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "../repository/clientes.entity"; // Import the missing Cliente class

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClientesResolver, ClientesService],
})

export class ClientesModule {}