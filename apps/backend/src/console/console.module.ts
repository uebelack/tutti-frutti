import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule as NestConsoleModule } from 'nestjs-console';
import { HttpModule } from '@nestjs/axios';
import { ImportTask } from './tasks/import.task';
import { TestDataTask } from './tasks/test-data.task';
import { PrismaService } from '../app/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NestConsoleModule,
    HttpModule,
  ],
  providers: [ImportTask, TestDataTask, PrismaService],
})
export class ConsoleModule {}
