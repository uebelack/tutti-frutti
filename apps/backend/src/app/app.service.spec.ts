import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, PrismaService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to backend!"', async () => {
      expect(await service.getData()).toEqual({
        message: 'Welcome to backend!',
      });
    });
  });
});
