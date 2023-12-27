import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { BarbeirosModule } from './barbeiros/barbeiros.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_user',
    password: 'your_password',
    database: 'barbershop_schema',
    entities: [__dirname + '****/***/**/*.model{.ts,.js}'],
    synchronize: true,
  }),
  ClientesModule,
  BarbeirosModule,
  AgendamentosModule,
],
})
export class AppModule {}
