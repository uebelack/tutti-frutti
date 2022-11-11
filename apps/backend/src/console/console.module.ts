import { Module } from '@nestjs/common';
import { ConsoleModule as NestConsoleModule } from 'nestjs-console';
import { HttpModule } from '@nestjs/axios';
import { AppModule } from '../app/app.module';
import { ImportTask } from './tasks/import.task';

@Module({
  imports: [
    AppModule,
    NestConsoleModule,
    HttpModule,
  ],
  providers: [ImportTask],
})
export class ConsoleModule {}
