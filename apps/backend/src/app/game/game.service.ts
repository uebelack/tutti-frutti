import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as prisma from '@prisma/client';
import { maxBy, shuffle } from 'lodash';
import { Errors } from '@toptal-hackathon-t2/types';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameInput } from './dto/create-game.input';
import { GameEntity } from '../entities/game.entity';
import { WordEntity } from '../entities/word.entity';

import { AnswerRoundInput } from './dto/answer-round.input';
import { LeaderboardService } from '../leaderboard/leaderboard.service';
import { CategoryService } from '../category/category.service';
import { GameResultsEntity } from '../entities/game-results.entity';
import { FiftyFiftyInput } from './dto/fifty-fifty.input';
import { GameConfig } from '../config/game-config.type';

interface RawWord {
  word_id: string;
  word_text: string;
  category_id: string;
  category_name: string;
  category_description: string;
}

type MappedWord = Pick<prisma.Word, 'id' | 'text'> & {
  category: Pick<prisma.Category, 'id' | 'name' | 'description'>;
};

// IMP move to separate mapper file
const wordMapper = (word: RawWord): MappedWord => ({
  id: word.word_id,
  text: word.word_text,
  category: {
    id: word.category_id,
    name: word.category_name,
    description: word.category_description,
  },
});

interface WordAndCategory {
  categoryName: string;
  categoryDescription: string;
  character: string;
  words: Pick<WordEntity, 'id' | 'text'>[];
}

@Injectable()
export class GameService {
  private readonly config: GameConfig;

  constructor(
    private readonly prismaService: PrismaService,
    private leaderboardService: LeaderboardService,
    private categoryService: CategoryService,
    private configService: ConfigService
  ) {
    this.config = configService.get('game');
  }

  async startGame(
    auth0Id: string,
    createGameInput: CreateGameInput
  ): Promise<GameEntity> {
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
        rounds: {
          include: {
            correctWord: true,
          },
        },
      },
    });

    const round = await this.getWordsAndCategoryForRound(game);

    return this.getGameFields(auth0Id, game, round);
  }

  async answerRound(
    auth0Id: string,
    answerRoundInput: AnswerRoundInput
  ): Promise<GameEntity> {
    const game = await this.findGame(auth0Id, answerRoundInput.gameId);
    this.checkForTimeout(game);

    const lastRound = maxBy(game.rounds, 'index');
    const isCorrect = lastRound.correctWord?.id === answerRoundInput.wordId;

    const updatedGame = await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        score: {
          increment: isCorrect
            ? this.config.correctAnswerPoints
            : this.config.incorrectAnswerPoints,
        },
      },
      include: {
        categories: true,
        rounds: {
          include: {
            correctWord: true,
          },
        },
      },
    });

    const round = await this.getWordsAndCategoryForRound(game);

    return this.getGameFields(auth0Id, updatedGame, round);
  }

  async useFiftyFifty(
    auth0Id: string,
    fiftyFiftyInput: FiftyFiftyInput
  ): Promise<GameEntity> {
    const game = await this.findGame(auth0Id, fiftyFiftyInput.gameId);
    this.checkForTimeout(game);

    if ((await this.getFiftyFiftyUsesLeft(auth0Id, game.fiftyFiftyUses)) <= 0) {
      throw new ConflictException(Errors.NO_MORE_50_50);
    }

    const lastRound = maxBy(game.rounds, 'index');
    const character = lastRound.correctWord.text.charAt(0);

    const incorrectWordIdsToShow = shuffle(
      lastRound.incorrectWords.map((i) => i.id)
    ).slice(0, Math.floor(this.config.wordsPerRound / 2));

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

    return this.getGameFields(auth0Id, game, {
      categoryName: lastRound.correctWord.category.name,
      categoryDescription: lastRound.correctWord.category.description,
      character,
      words: fiftyFiftyInput.words.map((word) => ({
        ...word,
        fiftyFiftyWrong: incorrectWordIdsToShow.indexOf(word.id) !== -1,
      })),
    });
  }

  async skipRound(auth0Id: string, gameId: string): Promise<GameEntity> {
    const game = await this.findGame(auth0Id, gameId);
    this.checkForTimeout(game);

    if (game.skipUses >= this.config.maxSkipRounds) {
      throw new ConflictException(Errors.NO_MORE_SKIPS);
    }

    await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        skipUses: {
          increment: 1,
        },
      },
    });

    const round = await this.getWordsAndCategoryForRound(game);

    return this.getGameFields(auth0Id, game, round);
  }

  async getResultsForGame(
    auth0: string,
    gameId: string
  ): Promise<GameResultsEntity> {
    const game = await this.findGame(auth0, gameId);

    return {
      id: game.id,
      score: game.score,
    };
  }

  private async findGame(
    auth0Id: string,
    gameId: string
  ): Promise<
    prisma.Game & {
      categories: prisma.Category[];
      rounds: (prisma.Round & {
        correctWord: prisma.Word & {
          category: prisma.Category;
        };
        incorrectWords: (prisma.Word & {
          fiftyFiftyWrong?: boolean;
        })[];
      })[];
    }
    > {
    const game = await this.prismaService.game.findFirst({
      where: {
        id: gameId,
        user: {
          auth0: auth0Id,
        },
      },
      include: {
        categories: true,
        rounds: {
          include: {
            incorrectWords: true,
            correctWord: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });

    if (!game) {
      throw new NotFoundException(Errors.GAME_NOT_FOUND);
    }

    return game;
  }

  private checkForTimeout(game: { createdAt: Date }) {
    const timeSinceStart = Date.now() - game.createdAt.getTime();
    if (timeSinceStart > this.config.timeLimitInSeconds * 1e3) {
      throw new ConflictException(Errors.TIME_IS_UP);
    }
  }

  private async findNextCorrectWord(
    categoryIds: string[],
    usedWordIds: string[]
  ): Promise<MappedWord> {
    const [row] = await this.prismaService.$queryRaw<RawWord[]>`
      SELECT
        w.id as "word_id",
        w.text as "word_text",
        c.id as "category_id",
        c.name as "category_name",
        c.description as "category_description"
      FROM
        "Word" as w
      LEFT JOIN "Category" as c
        ON w."categoryId" = c.id
      WHERE
        "categoryId" in (${prisma.Prisma.join(categoryIds)})
        ${
  usedWordIds.length > 0
    ? prisma.Prisma.sql`AND w.id not in (${prisma.Prisma.join(
      usedWordIds
    )})`
    : prisma.Prisma.empty
}
      ORDER BY random() limit 1;
    `;
    return wordMapper(row);
  }

  private async findNextIncorrectWords(
    categoryId: string,
    firstLetter: string
  ): Promise<MappedWord[]> {
    const rows = await this.prismaService.$queryRawUnsafe<RawWord[]>(
      `
      SELECT
        w.id as "word_id",
        w.text as "word_text",
        c.id as "category_id",
        c.name as "category_name",
        c.description as "category_description"
      FROM
        "Word" as w
      LEFT JOIN "Category" as c
        ON w."categoryId" = c.id
      WHERE
        "categoryId" <> '$1'
        AND text ILIKE $2
      ORDER BY random() limit $3;
    `,
      categoryId,
      `${firstLetter}%`,
      this.config.wordsPerRound - 1
    );
    return rows.map(wordMapper);
  }

  private async getWordsAndCategoryForRound(
    game: prisma.Game & {
      categories: prisma.Category[];
      rounds: (prisma.Round & {
        correctWord: prisma.Word;
      })[];
    }
  ): Promise<WordAndCategory> {
    const categoryIds = game.categories.map((c) => c.id);
    const usedWordIds = game.rounds.map((r) => r.correctWord.id);
    const correctWord = await this.findNextCorrectWord(
      categoryIds,
      usedWordIds
    );
    const character = correctWord.text.charAt(0);

    const incorrectWords = await this.findNextIncorrectWords(
      correctWord.id,
      character
    );

    await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        rounds: {
          create: {
            index: game.rounds.length,
            correctWord: {
              connect: {
                id: correctWord.id,
              },
            },
            incorrectWords: {
              connect: incorrectWords.map((w) => ({ id: w.id })),
            },
          },
        },
      },
    });

    return {
      categoryName: correctWord.category.name,
      categoryDescription: correctWord.category.description,
      character,
      words: shuffle([correctWord, ...incorrectWords]), // TODO make alphabetical order
    };
  }

  private async getFiftyFiftyUsesLeft(
    auth0Id: string,
    fiftyFiftyUses: number
  ): Promise<number> {
    const isUserInLeaderboard = await this.leaderboardService.isUserInLeaderboard(auth0Id);
    const maxFiftyFifty = isUserInLeaderboard
      ? this.config.fiftyFiftyTop
      : this.config.fiftyFiftyDefault;

    return maxFiftyFifty - fiftyFiftyUses;
  }

  private async getGameFields(
    auth0Id: string,
    game: prisma.Game & {
      categories: prisma.Category[];
      rounds: prisma.Round[];
    },
    round: WordAndCategory
  ): Promise<GameEntity> {
    const fiftyFiftyUsesLeft = await this.getFiftyFiftyUsesLeft(
      auth0Id,
      game.fiftyFiftyUses
    );

    return {
      ...game,
      ...round,
      round: game.rounds.length + 1,
      fiftyFiftyUsesLeft,
      timeLimit: this.config.timeLimitInSeconds,
    };
  }
}
