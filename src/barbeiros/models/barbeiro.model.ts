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

  @Field({nullable: true})
  @Column({nullable: true})
  name: string;

  @Field({nullable: true})
  @Column({nullable: true})
  telephone: string;

  @Field({nullable: true})
  @Column({nullable: true})
  birtday: Date;

  @Field(type => [Agendamentos], {nullable: true})
  @OneToMany(type => Agendamentos, agendamento => agendamento.barbeiro)
  agendamentos: Agendamentos[];
}
