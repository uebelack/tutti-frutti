import { GraphQLExecutionContext } from '@nestjs/graphql';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';

export type GraphQLContext = GraphQLExecutionContext & {
  req: Request & {
    user: {
      sub: string;
    };
  };
  res: Response;
};
