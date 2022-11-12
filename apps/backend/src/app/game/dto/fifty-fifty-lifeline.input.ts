import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FiftyFiftyLifeline {
  @Field(() => String, { description: 'Game ID' })
    gameId: string;
}
