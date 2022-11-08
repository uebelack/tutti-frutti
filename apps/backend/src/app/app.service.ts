import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getData(): Promise<{ message: string; users: User[] }> {
    const users = await this.prisma.user.findMany();
    return { message: 'Welcome to backend!', users };
  }
}
