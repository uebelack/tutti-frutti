import { Field, InputType } from '@nestjs/graphql';
import { WordInput } from './word.input';

@InputType()
export class FiftyFiftyInput {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;

  @Field(() => [WordInput], { description: 'Words of current game' })
    words: WordInput[];
}
