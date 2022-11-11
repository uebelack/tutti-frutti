import { Test, TestingModule } from '@nestjs/testing';
import { WordsResolver } from './words.resolver';
import { WordsService } from './words.service';

describe('WordsResolver', () => {
  let resolver: WordsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordsResolver, WordsService],
    }).compile();

    resolver = module.get<WordsResolver>(WordsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
