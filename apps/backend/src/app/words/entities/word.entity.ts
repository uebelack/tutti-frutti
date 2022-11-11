import { Field, ObjectType } from '@nestjs/graphql';
// eslint-disable-next-line import/no-cycle
import { Category } from './category.entity';

@ObjectType()
export class Word {
  @Field(() => String, { description: 'Word ID' })
    id: string;

  @Field(() => String, { description: 'Word Text' })
    text: string;

  @Field(() => Category, { description: 'Word Category' })
    category: Category;
}
