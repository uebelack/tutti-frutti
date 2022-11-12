import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardResolver } from './leaderboard.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [LeaderboardService, LeaderboardResolver, PrismaService],
  exports: [LeaderboardService],
})
export class LeaderboardModule {}
