import {
  Injectable, CacheKey, Inject, CACHE_MANAGER,
} from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager) {}

  @CacheKey('category_find_all')
  async findAll(): Promise<Category[]> {
    let result = await this.cacheManager.get('category_find_all');

    if (!result) {
      result = await this.prisma.category.findMany({ orderBy: { name: 'asc' } });
      await this.cacheManager.set('category_find_all', result);
    }

    return result;
  }
}
