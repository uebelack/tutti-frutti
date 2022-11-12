/* eslint-disable no-plusplus */
import { Console, Command, createSpinner } from 'nestjs-console';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../../app/prisma/prisma.service';

@Console()
export class TestDataTask {
  constructor(private readonly prisma: PrismaService) {}

  async createTestGame(user, games, index = 0) {
    await this.prisma.game.create({
      data: {
        userId: user.id,
        score: parseInt(faker.random.numeric(3), 10),
      },
    });

    if (index < games) {
      await this.createTestGame(user, games, index + 1);
    }
  }

  async createTestUser(index = 0) {
    const user = await this.prisma.user.create({
      data: {
        auth0: uuidv4(),
        email: faker.internet.email(),
        picture: faker.internet.avatar(),
        name: faker.name.fullName(),
      },
    });

    await this.createTestGame(user, parseInt(faker.random.numeric(1), 10));

    if (index < 50) {
      await this.createTestUser(index + 1);
    }
  }

  @Command({
    command: 'test-data',
    description: 'create test data',
  })
  async testData(): Promise<void> {
    const spin = createSpinner();
    spin.start('Creating some users ...');

    await this.createTestUser();

    spin.succeed('Test data creation done');
  }
}
