import { Injectable } from '@nestjs/common';
import { LeaderboardEntryEntity } from '../entities/leaderboard-entry.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateLeaderboard(): Promise<LeaderboardEntryEntity[]> {
    const result = (await this.prisma.$queryRaw`
    SELECT ROW_NUMBER() OVER (ORDER BY score DESC) AS place, l.* FROM (
      SELECT
        u.id,
        u.name,
        u.picture,
        sum(g.score) as score
      FROM
        "User" AS u,
        "Game" AS g
      WHERE
        u.id=g."userId"
      GROUP BY
        u.id,
        u.name,
        u.picture
      ORDER BY score DESC
      LIMIT 10
    ) AS l
    `) as {
      place: number;
      id: string;
      name: string;
      picture: string;
      score: number;
    }[];

    return result.map((row) => ({
      place: parseInt(row.place.toString(), 10),
      user: {
        id: row.id,
        name: row.name,
        picture: row.picture,
      },
      score: parseInt(row.score.toString(), 10),
    }));
  }

  async isUserInLeaderboard(auth0: string): Promise<boolean> {
    const result = (await this.prisma.$queryRaw`
    SELECT 1 FROM (
      SELECT
        u.id,
        u.auth0,
        sum(g.score) as score
      FROM
        "User" AS u,
        "Game" AS g
      WHERE
        u.id=g."userId"
      GROUP BY
        u.id
      ORDER BY score DESC
      LIMIT 10
    ) AS l
    WHERE l.auth0 = ${auth0}
    `) as [];

    return result.length > 0;
  }
}
