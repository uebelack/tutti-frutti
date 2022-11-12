import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

describe('GameService', () => {
  let service: GameService;
  let prisma: { game: { findFirst: jest.Mock, update: jest.Mock }, category: { findFirst: jest.Mock } };
  let leaderboardService: { isUserInLeaderboard: jest.Mock };

  beforeEach(async () => {
    prisma = { game: { findFirst: jest.fn(), update: jest.fn() }, category: { findFirst: jest.fn() } };
    leaderboardService = { isUserInLeaderboard: jest.fn() };

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

  it('should throw an error if user already used all his jokers', async () => {
    prisma.game.findFirst.mockResolvedValueOnce({ words: [{ id: 'c' }], fiftyFiftyUses: 1 });
    prisma.category.findFirst.mockResolvedValueOnce({ name: 'Test Category' });

    try {
      await service.useFiftyFifty('auth0Id', {
        gameId: 'abc',
        words: [
          { id: 'a', text: 'Dog' },
          { id: 'b', text: 'Door' },
          { id: 'c', text: 'Dark' },
          { id: 'd', text: 'Donut' },
        ],
      });
      throw new Error('Should have thrown an error');
    } catch (e) {
      expect(e).toBeInstanceOf(ConflictException);
    }
  });

  it('should return game with 50% of words marked as wrong and update game fiftyFiftyUses', async () => {
    prisma.game.findFirst.mockResolvedValueOnce(
      { id: 'abc', fiftyFiftyUses: 0, words: [{ id: 'c' }] },
    );
    prisma.category.findFirst.mockResolvedValueOnce({ name: 'Test Category' });

    const game = await service.useFiftyFifty('auth0Id', {
      gameId: 'abc',
      words: [
        { id: 'a', text: 'Dog' },
        { id: 'b', text: 'Door' },
        { id: 'c', text: 'Dark' },
        { id: 'd', text: 'Donut' },
      ],
    });

    expect(game.words[2].fiftyFiftyWrong).toBeFalsy();
    expect(game.words.filter((word) => word.fiftyFiftyWrong).length).toBe(2);

    expect(prisma.game.update).toHaveBeenCalledWith({
      where: { id: 'abc' },
      data: { fiftyFiftyUses: 1 },
    });
  });
});
