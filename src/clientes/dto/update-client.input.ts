import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateClientInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    telephone: string;

    @Field({ nullable: true })
    birtday: Date;
}