import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [LeaderboardModule, PrismaModule],
  providers: [GameResolver, GameService],
})
export class GameModule {}
