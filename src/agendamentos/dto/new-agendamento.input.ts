import { Field, ID, InputType} from "@nestjs/graphql";
import { Barbeiros } from "src/barbeiros/models/barbeiro.model";
import { Clientes } from "src/clientes/models/cliente.model";
import { BarberService } from "../models/agendamento-servicos.enum";

@InputType()
export class NewAgendamentoInput {
    @Field()
    date: Date;

    @Field(type => [BarberService])
    servico: [BarberService];

    @Field(type => ID)
    cliente_id: number;

    @Field(type => ID)
    barbeiro_id: number;
}