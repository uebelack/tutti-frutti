/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Query, Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Category } from '../game/entities/category.entity';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
