import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;

  @Field(() => String, { description: 'Category ID' })
    wordId: string;
}
