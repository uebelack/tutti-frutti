import { Test, TestingModule } from '@nestjs/testing';
import { LeaderboardResolver } from './leaderboard.resolver';

describe('LeaderboardResolver', () => {
  let resolver: LeaderboardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderboardResolver],
    }).compile();

    resolver = module.get<LeaderboardResolver>(LeaderboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
