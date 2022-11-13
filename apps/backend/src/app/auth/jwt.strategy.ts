import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService, private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get('auth0.domain')}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('auth0.audience'),
      issuer: `https://${configService.get('auth0.domain')}/`,
      algorithms: ['RS256'],
      passReqToCallback: true,
    });
  }

  validate(request: { headers: { authorization: string } }, payload: { sub: string }): any {
    this.userService.syncUserWithAuth0(payload.sub, request.headers.authorization);
    return payload;
  }
}
