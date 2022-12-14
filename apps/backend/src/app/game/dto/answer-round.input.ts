import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerRoundInput {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;

  @Field(() => String, { description: 'Word ID' })
    wordId: string;
}
