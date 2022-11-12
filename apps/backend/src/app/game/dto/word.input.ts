import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class WordInput {
  @Field(() => String, { description: 'Word ID' })
    id: string;

  @Field(() => String, { description: 'Word Text' })
    text: string;
}
