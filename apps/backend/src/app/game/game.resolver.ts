import {
  Args, Context, Mutation, Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from '../entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLContext } from '../../types/graphQlContext';
import { AnswerRoundInput } from './dto/answer-round.input';
import { FiftyFiftyInput } from './dto/fifty-fifty.input';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly wordsService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  createGame(
  @Args('createGameInput') createGameInput: CreateGameInput,
    @Context() context: GraphQLContext,
  ) {
    return this.wordsService.startGame(context.req.user.sub, createGameInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  answerRound(
  @Args('answerRoundInput') answerRoundInput: AnswerRoundInput,
    @Context() context: GraphQLContext,
  ) {
    return this.wordsService.answerRound(
      context.req.user.sub,
      answerRoundInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  useFiftyFifty(
  @Args('fiftyFiftyInput') fiftyFiftyInput: FiftyFiftyInput,
    @Context() context: GraphQLContext,
  ) {
    return this.wordsService.useFiftyFifty(
      context.req.user.sub,
      fiftyFiftyInput,
    );
  }
}
