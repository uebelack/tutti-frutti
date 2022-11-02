/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, Inject } from '@nestjs/common';
import {
  Args, Query, Resolver, Subscription,
} from '@nestjs/graphql';

import App from './app.type';

@Resolver(of => App)
class AppResolver {
  @Query(returns => App)
  app(): App {
    return new App();
  }
}

export default AppResolver;
