import { Field, ID, InputType} from "@nestjs/graphql";
import { Barbeiros } from "src/barbeiros/models/barbeiro.model";
import { Clientes } from "src/clientes/models/cliente.model";

@InputType()
export class NewAgendamentoInput {
    @Field()
    date: Date;

    @Field()
    servico: string;

    @Field(type => ID)
    cliente_id: number;

    @Field(type => ID)
    barbeiro_id: number;
}