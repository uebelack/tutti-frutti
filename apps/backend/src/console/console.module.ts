import { Module } from '@nestjs/common';
import { ConsoleModule as NestConsoleModule } from 'nestjs-console';
import { AppModule } from '../app/app.module';
import { ImportTask } from './tasks/import.task';

@Module({
  imports: [
    AppModule,
    NestConsoleModule,
  ],
  providers: [ImportTask],
})
export class ConsoleModule {}
