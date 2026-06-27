import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { LoginInput } from './dto/login.input';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginInput, response: Response) {
    const user = await this.verifyUser(email, password);
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        parseInt(this.configService.getOrThrow('AUTH_JWT_EXPIRATION_MS')),
    );
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };
    const accessToken = this.jwtService.sign(tokenPayload); // creates a signed jwt string
    response.cookie('Authentication', accessToken, {
      // writes the signed jwt into an httpOnlyCookie
      httpOnly: true, // We are using httponly cookie because JavaScript running in the browser cannot read httpOnly cookies. This means even if your site has an XSS vulnerability, an attacker's injected JS can't steal the token. The cookie is sent automatically by the browser on every request.
      secure: this.configService.get('NODE_ENV') === 'production',
      expires,
    });
    return user;
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });

      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.', error);
    }
  }
}
