import {
  Args, Int, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { WordsService } from './words.service';
import { Word } from './entities/word.entity';
import { CreateWordInput } from './dto/create-word.input';
import { UpdateWordInput } from './dto/update-word.input';

@Resolver(() => Word)
export class WordsResolver {
  constructor(private readonly wordsService: WordsService) {}

  @Mutation(() => Word)
  createWord(@Args('createWordInput') createWordInput: CreateWordInput) {
    return this.wordsService.create(createWordInput);
  }

  @Query(() => [Word], { name: 'words' })
  findAll() {
    return this.wordsService.findAll();
  }

  @Query(() => Word, { name: 'word' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.wordsService.findOne(id);
  }

  @Mutation(() => Word)
  updateWord(@Args('updateWordInput') updateWordInput: UpdateWordInput) {
    return this.wordsService.update(updateWordInput.id, updateWordInput);
  }

  @Mutation(() => Word)
  removeWord(@Args('id', { type: () => Int }) id: number) {
    return this.wordsService.remove(id);
  }
}
