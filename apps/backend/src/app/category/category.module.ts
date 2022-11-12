import { Module, CacheModule } from '@nestjs/common';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CategoryService, CategoryResolver, PrismaService],
  exports: [CategoryService],
})
export class CategoryModule {}
