/* eslint-disable no-plusplus */
import { Logger } from '@nestjs/common';
import { Console, Command, createSpinner } from 'nestjs-console';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Category } from '@prisma/client';
import { parse } from 'papaparse';
import { PrismaService } from '../../app/prisma/prisma.service';

type ImportCategory = {
  name: string;
  emoji: string;
  description: string;
  words: string[];
};

@Console()
export class ImportTask {
  private readonly logger = new Logger(ImportTask.name);

  constructor(private readonly httpService: HttpService, private readonly prisma: PrismaService) {}

  async getSheetContent(sheet: string) {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_DATA_ID}/gviz/tq?tqx=out:csv&sheet=${sheet}`, {
        headers: {
        },
      }).pipe(catchError((error: any) => {
        this.logger.error(error);
        return error;
      })),
    ) as { data: string };

    return parse(data).data as Array<string[]>;
  }

  async importWords(category: Category, words: string[], index = 0) {
    if (index >= words.length) {
      return;
    }

    const word = words[index];

    await this.prisma.word.upsert({
      where: {
        text: word,
      },
      update: {
        categoryId: category.id,
      },
      create: {
        text: word,
        categoryId: category.id,
      },
    });

    this.importWords(category, words, index + 1);
  }

  async importCategories(categories: ImportCategory[], index = 0) {
    if (index >= categories.length) {
      return;
    }

    const category = categories[index];

    const persistentCategory = await this.prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: {
        emoji: category.emoji,
        description: category.description,
      },
      create: {
        name: category.name,
        emoji: category.emoji,
        description: category.description,
      },
    });

    await this.importWords(persistentCategory, category.words);
    await this.importCategories(categories, index + 1);
  }

  @Command({
    command: 'import',
    description: 'import categories and words from googlesheet',
  })
  async import(): Promise<void> {
    const spin = createSpinner();
    spin.start('Importing categories and words...');

    const words = await this.getSheetContent('Words');

    const categories = (await this.getSheetContent('Categories'))
      .map((row) => ({
        emoji: row[0],
        name: row[1],
        description: row[2],
        words: words.slice(1).map((wordRow) => wordRow[words[0].indexOf(row[1])]).filter((word) => word !== ''),
      } as ImportCategory));

    await this.importCategories(categories, 1);
    spin.succeed('Import done');
  }
}
