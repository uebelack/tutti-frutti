/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Query, Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LeaderboardEntry } from '../entities/leaderboard-entry.entity';
import { LeaderboardService } from './leaderboard.service';

@Resolver(() => LeaderboardEntry)
export class LeaderboardResolver {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [LeaderboardEntry])
  leaderboard(): Promise<LeaderboardEntry[]> {
    return this.leaderboardService.calculateLeaderboard();
  }
}
