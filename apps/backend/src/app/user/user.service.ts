import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma/prisma.service';

type Auth0User = {
  name: string
  email: string
  picture: string
};

const USER_SYNC_INTERVAL = 1000 * 60 * 60; // every hour

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}

  async findUserById(id: string): Promise<unknown> {
    return { id };
  }

  async findUserByAuth0(auth0: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { auth0 },
    });
  }

  async syncUserWithAuth0(auth0: string, userToken: string) {
    const user = await this.findUserByAuth0(auth0);
    if (!user || user.updatedAt.getTime() < new Date().getTime() - USER_SYNC_INTERVAL) {
      const { data } = await firstValueFrom(
        this.httpService.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
          headers: {
            Authorization: userToken,
          },
        }).pipe(catchError((error: any) => {
          this.logger.error(error);
          return error;
        })),
      ) as { data: Auth0User };

      await this.prisma.user.upsert({
        where: {
          auth0,
        },
        update: {
          email: data.email,
          name: 'data.name',
          picture: data.picture,
        },
        create: {
          auth0,
          email: data.email,
          name: 'data.name',
          picture: data.picture,
        },
      });
    }
  }
}
