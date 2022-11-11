import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { GameModule } from './game/game.module';

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
    GameModule,
  ],
  providers: [AppService, AppResolver, PrismaService, JwtStrategy, UserService],
  exports: [PrismaService], // needed for console module
})
export class AppModule {}
