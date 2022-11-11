import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './entities/game.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly wordsService: GameService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Game)
  createGame(
  @Args('createWordInput') createWordInput: CreateGameInput,
    @Req() req: Request,
  ) {
    console.log(req);
    // return this.wordsService.startGame(createWordInput);
  }
}
