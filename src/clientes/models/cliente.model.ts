import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClienteModel {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  telephone: string;

  @Field()
  birtday: Date;
}