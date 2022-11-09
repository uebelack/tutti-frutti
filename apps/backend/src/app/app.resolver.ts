/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  Args, Query, Resolver, Subscription,
} from '@nestjs/graphql';

import App from './app.type';

@Resolver(of => App)
class AppResolver {
  @UseGuards(AuthGuard('jwt'))
  @Query(returns => App)
  app(): App {
    return new App();
  }
}

export default AppResolver;
