import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class LeaderboardEntry {
  @Field(() => Number, { description: 'Place' })
    place: number;

  @Field(() => User, { description: 'User' })
    user: User;

  @Field(() => Number, { description: 'Score' })
    score: number;
}
