import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CategoryEntity } from './category.entity';
import { WordEntity } from './word.entity';

@ObjectType()
export class GameEntity {
  @Field(() => String, { description: 'ID' })
    id: string;

  @Field(() => Date, { description: 'Created At' })
    createdAt: Date;

  @Field(() => Int, {
    description: 'How many times fifty-fifty lifeline can be used',
  })
    fiftyFiftyUsesLeft: number;

  @Field(() => [CategoryEntity], {
    description: 'All categories selected in game',
  })
    categories: CategoryEntity[];

  @Field(() => String, {
    description: 'Category name selected for current round',
  })
    categoryName: string;

  @Field(() => String, {
    description: 'Category description selected for current round',
  })
    categoryDescription: string;

  @Field(() => String, {
    description: 'Current character selected for current round',
  })
    character: string;

  @Field(() => [WordEntity], { description: 'Current round words' })
    words: WordEntity[];

  @Field(() => Int, { description: 'Current score' })
    score: number;

  @Field(() => Int, { description: 'Current round number' })
    round: number;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Previous round correct',
  })
    previousRoundCorrect?: boolean;

  @Field(() => Int, {
    description: 'Time limit for current round',
  })
    timeLimit: number;
}
