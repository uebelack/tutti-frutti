import { Injectable, NotFoundException } from '@nestjs/common';
import { sample, shuffle } from 'lodash';
import { pick } from 'next/dist/lib/pick';
import { PrismaService } from '../prisma.service';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from '../entities/game.entity';
import { Word } from '../entities/word.entity';
import { AnswerRoundInput } from './dto/answer-round.input';

@Injectable()
export class GameService {
  private readonly WORDS_PER_ROUND = 4;

  private readonly CORRECT_ANSWER_POINTS = 10;

  private readonly INCORRECT_ANSWER_POINTS = -20;

  constructor(private readonly prismaService: PrismaService) {}

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

    const round = await this.getRound(auth0Id, game.id);

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

    const lastWord = game.words[game.words.length - 1];
    const correct = lastWord.id === answerRoundInput.wordId;

    const updatedGame = await this.prismaService.game.update({
      where: {
        id: game.id,
      },
      data: {
        score: {
          increment: correct
            ? this.CORRECT_ANSWER_POINTS
            : this.INCORRECT_ANSWER_POINTS,
        },
      },
      include: {
        categories: true,
        words: true,
      },
    });

    const round = await this.getRound(auth0Id, game.id);

    return {
      ...updatedGame,
      ...round,
      round: updatedGame.words.length,
      previousRoundCorrect: correct,
    };
  }

  private async getRound(
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

    const incorrectWords = await this.prismaService.word.findMany({
      where: {
        categoryId: {
          notIn: game.categories.map((c) => c.id),
        },
      },
      take: this.WORDS_PER_ROUND - 1,
      select: {
        id: true,
        text: true,
      },
    });

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
      },
    });

    return {
      categoryName: correctWord.category.name,
      words: shuffle([pick(correctWord, ['id', 'text']), ...incorrectWords]),
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
      },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    return game;
  }
}
