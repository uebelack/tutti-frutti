import { Module } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CategoryService, CategoryResolver, PrismaService],
})
export class CategoryModule {}
