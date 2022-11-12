import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
