import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardResolver } from './leaderboard.resolver';
import { LeaderboardService } from './leaderboard.service';

describe('LeaderboardResolver', () => {
  let resolver: LeaderboardResolver;

  beforeEach(async () => {
    const leaderboardService = {};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaderboardResolver,
        { provide: LeaderboardService, useValue: leaderboardService },
      ],
    }).compile();

    resolver = module.get<LeaderboardResolver>(LeaderboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
