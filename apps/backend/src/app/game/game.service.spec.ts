import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

describe('GameService', () => {
  let service: GameService;
  const prisma = { game: { findFirst: jest.fn() }, category: { findFirst: jest.fn() } };
  const leaderboardService = { isUserInLeaderboard: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: PrismaService, useValue: prisma },
        { provide: LeaderboardService, useValue: leaderboardService },
      ],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('should throw an error if user already used all his jokers', async () => {
    prisma.game.findFirst.mockResolvedValueOnce({ words: ['c'], fiftyFiftyUses: 1 });
    prisma.category.findFirst.mockResolvedValueOnce({ name: 'Test Category' });
    expect(() => service.useFiftyFifty('auth0Id', { gameId: 'abc', wordIds: ['a', 'b', 'c', 'd'] })).toThrowError();
  });
});
