import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => String, { description: 'User ID' })
    id: string;

  @Field(() => String, { description: 'Url to the users picture' })
    picture: string;

  @Field(() => String, { description: 'User Name' })
    name: string;

  @Field(() => Number, { description: 'Top Score', nullable: true })
    score?: number;
}
