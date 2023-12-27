import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewClienteInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    telephone: string;

    @Field()
    birtday: Date;
}