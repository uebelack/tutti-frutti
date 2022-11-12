import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { sample, sampleSize, shuffle } from 'lodash';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from '../entities/game.entity';
import { Word } from '../entities/word.entity';
import { AnswerRoundInput } from './dto/answer-round.input';
import { FiftyFiftyInput } from './dto/fifty-fifty.input';
import { LeaderboardService } from '../leaderboard/leaderboard.service';

@Injectable()
export class GameService {
  private readonly WORDS_PER_ROUND = 4;

  private readonly TIME_LIMIT_SEC = 60;

  private readonly CORRECT_ANSWER_POINTS = 10;

  private readonly INCORRECT_ANSWER_POINTS = -20;

  private readonly FIFTY_FIFTY_DEFAULT = 1;

  private readonly FIFTY_FIFTY_TOP = 2;

  constructor(
    private readonly prismaService: PrismaService,
    private leaderboardService: LeaderboardService,
  ) {}

  async startGame(
    auth0Id: string,
    createGameInput: CreateGameInput,
  ): Promise<Game> {
    const game = await this.prismaService.game.create({
      data: {
        user: {
          connect: {
            auth0: auth0Id,
          },
        },
        categories: {
          connect: createGameInput.categories.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
        words: true,
      },
    });

    const round = await this.getWordsAndCategoryForRound(auth0Id, game.id);

    return {
      ...game,
      ...round,
      round: game.words.length,
    };
  }

  async answerRound(
    auth0Id: string,
    answerRoundInput: AnswerRoundInput,
  ): Promise<Game> {
    const game = await this.findGame(auth0Id, answerRoundInput.gameId);

    const timedOut = game.createdAt.getTime() - Date.now() > this.TIME_LIMIT_SEC * 1e3;
    if (timedOut) {
      throw new ConflictException('Time is up');
    }

    const isCorrect = game.lastWord?.id === answerRoundInput.wordId;

    const updatedGame = await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        score: {
          increment: isCorrect
            ? this.CORRECT_ANSWER_POINTS
            : this.INCORRECT_ANSWER_POINTS,
        },
      },
      include: {
        categories: true,
        words: true,
      },
    });

    const round = await this.getWordsAndCategoryForRound(auth0Id, game.id);

    return {
      ...updatedGame,
      ...round,
      round: updatedGame.words.length,
      previousRoundCorrect: isCorrect,
    };
  }

  async useFiftyFifty(
    auth0Id: string,
    fiftyFiftyInput: FiftyFiftyInput,
  ): Promise<Game> {
    const game = await this.findGame(auth0Id, fiftyFiftyInput.gameId);
    const isUserInLeaderboard = await this.leaderboardService.isUserInLeaderboard(auth0Id);
    const maxFiftyFifty = isUserInLeaderboard
      ? this.FIFTY_FIFTY_TOP
      : this.FIFTY_FIFTY_DEFAULT;

    if (game.fiftyFiftyUses >= maxFiftyFifty) {
      throw new ConflictException('No more lifelines available');
    }

    // IMP CACHE for performance?
    const currentCategory = await this.prismaService.category.findFirst({
      where: {
        id: game.lastWord.categoryId,
      },
    });

    const incorrectWordIdsToShow = shuffle(
      fiftyFiftyInput.words
        .map((word) => word.id)
        .filter((id) => id !== game.lastWord.id),
    ).slice(0, Math.floor(this.WORDS_PER_ROUND / 2));

    await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        fiftyFiftyUses: game.fiftyFiftyUses + 1,
      },
    });

    return {
      ...game,
      categoryName: currentCategory.name,
      words: fiftyFiftyInput.words.map((word) => ({
        ...word,
        fiftyFiftyWrong: incorrectWordIdsToShow.indexOf(word.id) !== -1,
      })),
      round: game.words.length,
    };
  }

  private async getWordsAndCategoryForRound(
    auth0Id: string,
    gameId: string,
  ): Promise<{
      categoryName: string;
      words: Pick<Word, 'id' | 'text'>[];
    }> {
    const game = await this.findGame(auth0Id, gameId);

    const correctWords = await this.prismaService.word.findMany({
      where: {
        id: {
          notIn: game.words.map((w) => w.id),
        },
        categoryId: {
          in: game.categories.map((c) => c.id),
        },
      },
      include: {
        category: true,
      },
    });
    const correctWord = sample(correctWords); // IMP move to SQL for performance

    const allIncorrectWords = await this.prismaService.word.findMany({
      where: {
        categoryId: {
          notIn: game.categories.map((c) => c.id),
        },
      },
    });
    const incorrectWords = sampleSize(
      allIncorrectWords,
      this.WORDS_PER_ROUND - 1,
    );

    await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        words: {
          connect: {
            id: correctWord.id,
          },
        },
        lastWord: {
          connect: {
            id: correctWord.id,
          },
        },
      },
    });

    return {
      categoryName: correctWord.category.name,
      words: shuffle([correctWord, ...incorrectWords]),
    };
  }

  private async findGame(auth0Id: string, gameId: string) {
    const game = await this.prismaService.game.findFirst({
      where: {
        id: gameId,
        user: {
          auth0: auth0Id,
        },
      },
      include: {
        categories: true,
        words: true,
        lastWord: true,
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }
}
