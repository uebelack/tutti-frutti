/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Args, Query, Resolver, Subscription,
} from '@nestjs/graphql';

import { JwtAuthGuard } from './auth/jwt-auth.guard';

import App from './app.type';

@Resolver(of => App)
export class AppResolver {
  @UseGuards(JwtAuthGuard)
  @Query(returns => App)
  app(): App {
    return new App();
  }
}
