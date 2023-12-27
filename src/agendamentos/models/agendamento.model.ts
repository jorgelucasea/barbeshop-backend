import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Clientes } from 'src/clientes/models/cliente.model';
import { Barbeiros } from 'src/barbeiros/models/barbeiro.model';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';


@InputType("AgendamentoInput")
@ObjectType("Agendamento")
@Entity('agendamentos')
export class Agendamentos {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    date: Date;

    @Field()
    @Column()
    servico: string;

    @ManyToOne(() => Clientes, cliente => cliente.agendamentos, { nullable: true})
    @JoinColumn({ name: 'cliente_id' })
    cliente: Clientes;

    @ManyToOne(() => Barbeiros, barbeiro => barbeiro.agendamentos, { nullable: true})
    @JoinColumn({ name: 'barbeiro_id' })
    barbeiro: Barbeiros;

}