import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

import { GameModule } from './game/game.module';
import { CategoryModule } from './category/category.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    HttpModule,
    CategoryModule,
    GameModule,
    LeaderboardModule,
    PrismaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
