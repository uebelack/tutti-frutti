import {
  Args, Context, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { GameEntity } from '../entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GraphQLContext } from '../../types/graphQlContext';
import { AnswerRoundInput } from './dto/answer-round.input';
import { FiftyFiftyInput } from './dto/fifty-fifty.input';

@Resolver(() => GameEntity)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameEntity)
  createGame(
  @Args('createGameInput') createGameInput: CreateGameInput,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.startGame(context.req.user.sub, createGameInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameEntity)
  answerRound(
  @Args('answerRoundInput') answerRoundInput: AnswerRoundInput,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.answerRound(context.req.user.sub, answerRoundInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GameEntity)
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
  @Mutation(() => GameEntity)
  skipRound(
  @Args('gameId') gameId: string,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.skipRound(context.req.user.sub, gameId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GameEntity)
  gameResults(
  @Args('gameId') gameId: string,
    @Context() context: GraphQLContext,
  ) {
    return this.gameService.getResultsForGame(context.req.user.sub, gameId);
  }
}
