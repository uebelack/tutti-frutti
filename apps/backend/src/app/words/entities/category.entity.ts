import { Field, ObjectType } from '@nestjs/graphql';
// eslint-disable-next-line import/no-cycle
import { Word } from './word.entity';

@ObjectType()
export class Category {
  @Field(() => String, { description: 'Category ID' })
    id: string;

  @Field(() => String, { description: 'Category Emoji' })
    emoji: string;

  @Field(() => String, { description: 'Category Name' })
    name: string;

  @Field(() => String, { nullable: true, description: 'Category Description' })
    description?: string;

  @Field(() => [Word], {
    description: 'Words from the Category',
  })
    words: Word[];
}
