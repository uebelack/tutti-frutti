import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => [String], { description: 'IDs of categories' })
    categories: string[];
}
