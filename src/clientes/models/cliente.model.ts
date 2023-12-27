import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Agendamentos } from 'src/agendamentos/models/agendamento.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@InputType("ClienteInput")
@ObjectType('Cliente')
@Entity('clientes')
export class Clientes {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    telephone: string;

    @Field()
    @Column()
    birtday: Date;

    @Field(type => [Agendamentos], {nullable: true})
    @OneToMany(() => Agendamentos, agendamento => agendamento.cliente)
    agendamentos: Agendamentos[];
}