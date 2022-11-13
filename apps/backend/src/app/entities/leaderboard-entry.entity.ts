import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from './user.entity';

@ObjectType()
export class LeaderboardEntryEntity {
  @Field(() => Number, { description: 'Place' })
    place: number;

  @Field(() => UserEntity, { description: 'User' })
    user: UserEntity;

  @Field(() => Number, { description: 'Score' })
    score: number;
}
