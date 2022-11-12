import {
  Args, Context, Mutation, Resolver, Query,
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
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  createGame(
  @Args('createGameInput') createGameInput: CreateGameInput,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.startGame(context.req.user.sub, createGameInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  answerRound(
  @Args('answerRoundInput') answerRoundInput: AnswerRoundInput,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.answerRound(
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
    return this.gameService.useFiftyFifty(
      context.req.user.sub,
      fiftyFiftyInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  skipRound(
  @Args('gameId') gameId: string,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.skipRound(context.req.user.sub, gameId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Game)
  game(
  @Args('gameId') gameId: string,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.findGame(context.req.user.sub, gameId);
  }
}
