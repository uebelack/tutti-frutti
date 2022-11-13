import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryEntity {
  @Field(() => String, { description: 'Category ID' })
    id: string;

  @Field(() => String, { description: 'Category Emoji' })
    emoji: string;

  @Field(() => String, { description: 'Category Name' })
    name: string;

  @Field(() => String, { nullable: true, description: 'Category Description' })
    description?: string;
}
