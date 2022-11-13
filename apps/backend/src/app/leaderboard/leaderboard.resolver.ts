/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeaderboardEntryEntity } from '../entities/leaderboard-entry.entity';
import { LeaderboardService } from './leaderboard.service';

@Resolver(() => LeaderboardEntryEntity)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [LeaderboardEntryEntity])
  leaderboard(): Promise<LeaderboardEntryEntity[]> {
    return this.leaderboardService.calculateLeaderboard();
  }
}
