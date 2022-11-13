import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WordEntity {
  @Field(() => String, { description: 'Word ID' })
    id: string;

  @Field(() => String, { description: 'Word Text' })
    text: string;

  @Field(() => Boolean, { nullable: true, description: 'Is wrong' })
    fiftyFiftyWrong?: boolean;
}
