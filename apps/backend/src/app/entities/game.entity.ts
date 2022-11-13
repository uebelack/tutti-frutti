import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Category } from './category.entity';
import { Word } from './word.entity';

@ObjectType()
export class Game {
  @Field(() => String, { description: 'ID' })
    id: string;

  @Field(() => Date, { description: 'Created At' })
    createdAt: Date;

  @Field(() => Int, {
    description: 'How many times fifty-fifty lifeline can be used',
  })
    fiftyFiftyUsesLeft: number;

  @Field(() => [Category], { description: 'All categories selected in game' })
    categories: Category[];

  @Field(() => String, {
    description: 'Category name selected for current round',
  })
    categoryName: string;

  @Field(() => [Word], { description: 'Current round words' })
    words: Word[];

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
