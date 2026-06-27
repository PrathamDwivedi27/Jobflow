import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request.cookies?.Authentication || request.token,
      ]),
      secretOrKey: configService.getOrThrow('AUTH_JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return payload; // here payload is {userId: --}
  }
}

/*

This is Passport.js integrated with NestJS. Here's the flow:

1.A request comes in -> jwtFromRequest extractor runs — it looks for the JWT in cookies.Authentication first, then falls back to request.token (for gRPC calls where there's no cookie)
2.Passport verifies the token signature using AUTH_JWT_SECRET
3.If valid, validate(payload) is called — whatever you return here gets attached to request.user
Here it just returns the raw payload { userId: ... } — that becomes req.user

*/
