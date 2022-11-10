import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { User } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './prisma.service';

type Auth0User = {
  name: string
  email: string
  picture: string
};

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

    if (!user) {
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

      await this.prisma.user.create({
        data: {
          email: data.email,
          name: 'data.name',
          picture: data.picture,
        },
      });
    }
  }
}
