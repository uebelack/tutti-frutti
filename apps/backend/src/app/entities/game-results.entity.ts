import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameResultsEntity {
  @Field(() => String, { description: 'ID' })
    id: string;

  @Field(() => Int, { description: "Game's score" })
    score: number;
}
