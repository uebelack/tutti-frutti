import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsResolver } from './words.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [WordsResolver, WordsService, PrismaService],
})
export class WordsModule {}
