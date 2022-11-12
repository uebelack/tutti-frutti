import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FiftyFiftyInput {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;

  @Field(() => String, { description: 'Word IDs of current game' })
    wordIds: string[];
}
