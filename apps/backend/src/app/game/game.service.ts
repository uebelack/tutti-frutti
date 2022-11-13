import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { sample, sampleSize, shuffle } from 'lodash';
import { Errors } from '@toptal-hackathon-t2/types';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from '../entities/game.entity';
import { Word } from '../entities/word.entity';
import { Category } from '../entities/category.entity';

import { AnswerRoundInput } from './dto/answer-round.input';
import { FiftyFiftyInput } from './dto/fifty-fifty.input';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class GameService {
  private readonly WORDS_PER_ROUND = 4;

  private readonly TIME_LIMIT_SEC = 10;

  private readonly CORRECT_ANSWER_POINTS = 10;

  private readonly INCORRECT_ANSWER_POINTS = -20;

  private readonly FIFTY_FIFTY_DEFAULT = 1;

  private readonly FIFTY_FIFTY_TOP = 2;

  private readonly MAX_SKIP_ROUNDS = Infinity;

  constructor(
    private readonly prismaService: PrismaService,
    private leaderboardService: LeaderboardService,
    private categoryService: CategoryService,
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
      fiftyFiftyUsesLeft: this.FIFTY_FIFTY_DEFAULT,
    };
  }

  async answerRound(
    auth0Id: string,
    answerRoundInput: AnswerRoundInput,
  ): Promise<Game> {
    const game = await this.findGame(auth0Id, answerRoundInput.gameId);
    this.checkForTimeout(game);

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
      fiftyFiftyUsesLeft: await this.getFiftyFiftyUsesLeft(
        auth0Id,
        game.fiftyFiftyUses,
      ),
    };
  }

  async useFiftyFifty(
    auth0Id: string,
    fiftyFiftyInput: FiftyFiftyInput,
  ): Promise<Game> {
    const game = await this.findGame(auth0Id, fiftyFiftyInput.gameId);
    this.checkForTimeout(game);

    if ((await this.getFiftyFiftyUsesLeft(auth0Id, game.fiftyFiftyUses)) <= 0) {
      throw new ConflictException(Errors.NO_MORE_50_50);
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
        fiftyFiftyUses: {
          increment: 1,
        },
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
      fiftyFiftyUsesLeft: await this.getFiftyFiftyUsesLeft(
        auth0Id,
        game.fiftyFiftyUses,
      ),
    };
  }

  async skipRound(auth0Id: string, gameId: string): Promise<Game> {
    const game = await this.findGame(auth0Id, gameId);
    this.checkForTimeout(game);

    if (game.timesSkipped >= this.MAX_SKIP_ROUNDS) {
      throw new ConflictException(Errors.NO_MORE_SKIPS);
    }

    await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        timesSkipped: {
          increment: 1,
        },
      },
    });

    const round = await this.getWordsAndCategoryForRound(auth0Id, game.id);

    return {
      ...game,
      ...round,
      round: game.words.length,
      fiftyFiftyUsesLeft: await this.getFiftyFiftyUsesLeft(
        auth0Id,
        game.fiftyFiftyUses,
      ),
    };
  }

  async findGame(auth0Id: string, gameId: string) {
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
      throw new NotFoundException(Errors.GAME_NOT_FOUND);
    }

    return game;
  }

  private async getFiftyFiftyUsesLeft(auth0Id: string, fiftyFiftyUses: number) {
    const isUserInLeaderboard = await this.leaderboardService.isUserInLeaderboard(auth0Id);
    const maxFiftyFifty = isUserInLeaderboard
      ? this.FIFTY_FIFTY_TOP
      : this.FIFTY_FIFTY_DEFAULT;

    return maxFiftyFifty - fiftyFiftyUses;
  }

  private checkForTimeout(game: { createdAt: Date }) {
    const timeSinceStart = Date.now() - game.createdAt.getTime();
    if (timeSinceStart > this.TIME_LIMIT_SEC * 1e3) {
      throw new ConflictException(Errors.TIME_IS_UP);
    }
  }

  private async findNextCategoryAndCorrectWord(
    gameId: string,
    gameCategoryIds: string[],
  ): Promise<{ nextCategory: Category; correctWord: Word }> {
    const nextCategory = sample(
      (await this.categoryService.findAll()).filter((c) => gameCategoryIds.includes(c.id)),
    );

    const correctWords = (await this.prismaService.$queryRaw`
      SELECT
        w.id,
        w.text
      FROM
        "Word" as w
      WHERE
        "categoryId"=${nextCategory.id}
        AND id not in (SELECT "B" FROM "_GameToWord" WHERE "A"=${gameId})
      ORDER BY random() limit 1;
    `) as { id: string; text: string }[];

    if (correctWords.length > 0) {
      return { nextCategory, correctWord: correctWords[0] };
    }

    return this.findNextCategoryAndCorrectWord(gameId, gameCategoryIds);
  }

  private async getWordsAndCategoryForRound(
    auth0Id: string,
    gameId: string,
  ): Promise<{
      categoryName: string;
      words: Pick<Word, 'id' | 'text'>[];
    }> {
    const game = await this.findGame(auth0Id, gameId);
    const gameCategoryIds = game.categories.map((c) => c.id);
    const { nextCategory, correctWord } = await this.findNextCategoryAndCorrectWord(gameId, gameCategoryIds);
    const character = correctWord.text.charAt(0);

    const allIncorrectWords = await this.prismaService.word.findMany({
      where: {
        categoryId: {
          not: nextCategory.id,
        },
        text: {
          startsWith: character,
          mode: 'insensitive',
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
      categoryName: nextCategory.name,
      words: shuffle([correctWord, ...incorrectWords]),
    };
  }
}
