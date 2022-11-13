import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameResults {
  @Field(() => String, { description: 'ID' })
    id: string;

  @Field(() => Int, { description: "Game's score" })
    score: number;
}
