import { Controller, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './token-payload.interface';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  authenticate(
    request: AuthenticateRequest & { user: TokenPayload },
  ): Promise<User> | Observable<User> | User {
    return this.usersService.getUser({ id: request.user.userId });
  }
}

/*

This is not a REST controller. The @AuthServiceControllerMethods() decorator (auto-generated from your .proto file) wires this class to handle gRPC calls. When jobflow-jobs sends a gRPC authenticate request:

JwtAuthGuard runs → validates the JWT token in the request
request.user is populated with TokenPayload by Passport
The full User object is fetched from DB and returned to the caller

*/
