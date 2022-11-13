import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CategoryEntity } from '../entities/category.entity';
import { CategoryService } from './category.service';

@Resolver(() => CategoryEntity)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [CategoryEntity])
  categories(): Promise<CategoryEntity[]> {
    return this.categoryService.findAll();
  }
}
