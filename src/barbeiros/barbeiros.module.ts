import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Barbeiros } from "./models/barbeiro.model";
import { BarbeirosResolver } from "./barbeiros.resolver";
import { BarbeirosService } from "./barbeiros.service";

@Module({
    imports: [TypeOrmModule.forFeature([Barbeiros])],
    providers: [BarbeirosResolver, BarbeirosService],
    exports: [BarbeirosService]
})

export class BarbeirosModule {}