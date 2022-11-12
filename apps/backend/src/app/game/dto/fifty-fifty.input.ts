import { Field, InputType } from '@nestjs/graphql';
import { Word } from '../../entities/word.entity';

@InputType()
export class FiftyFiftyInput {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;

  @Field(() => String, { description: 'Word IDs of current game' })
    words: Word[];
}
