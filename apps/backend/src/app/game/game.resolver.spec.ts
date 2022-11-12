import { Test, TestingModule } from '@nestjs/testing';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

describe('GameResolver', () => {
  let resolver: GameResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameResolver, { provide: GameService, useValue: {} },
      ],
    }).compile();

    resolver = module.get<GameResolver>(GameResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
