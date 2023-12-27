import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ClientesArgs {
    @Field(type => Int)
    skip: number;

    @Field(type => Int)
    take: number;
}