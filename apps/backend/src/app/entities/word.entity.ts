import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field(() => String, { description: 'Word ID' })
    id: string;

  @Field(() => String, { description: 'Word Text' })
    text: string;

  @Field(() => String, { description: 'Word Text' })
    fiftyFiftyWrong?: boolean;
}