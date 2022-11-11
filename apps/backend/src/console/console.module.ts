import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule as NestConsoleModule } from 'nestjs-console';
import { HttpModule } from '@nestjs/axios';
import { ImportTask } from './tasks/import.task';

import { PrismaService } from '../app/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestConsoleModule,
    HttpModule,
  ],
  providers: [ImportTask, PrismaService],
})
export class ConsoleModule {}
