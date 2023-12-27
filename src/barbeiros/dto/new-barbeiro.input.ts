import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewBabeiroInput {
    @Field()
    name: string;

    @Field()
    telephone: string;

    @Field({nullable: true})
    birtday: Date;
}