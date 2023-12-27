import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamentos } from 'src/agendamentos/models/agendamento.model';

@InputType("BarbeiroInput")
@ObjectType("Barbeiro")
@Entity('barbeiros')
export class Barbeiros {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  telephone: string;

  @Field()
  @Column()
  birtday: Date;

  @Field(type => [Agendamentos], {nullable: true})
  @OneToMany(() => Agendamentos, agendamento => agendamento.barbeiro)
  agendamentos: Agendamentos[];
}
