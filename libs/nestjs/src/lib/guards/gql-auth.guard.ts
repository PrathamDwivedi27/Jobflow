// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from 'types/proto/auth';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(GqlAuthGuard.name);
  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = this.getRequest(context).cookies?.Authentication;

    if (!token) {
      return false;
    }

    return this.authService.authenticate({ token }).pipe(
      map((res) => {
        this.getRequest(context).user = res;
        return true;
      }),
      catchError((err) => {
        this.logger.error(err);
        return of(false);
      }),
    );
  }

  private getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

/*

Why is there a second GqlAuthGuard? The one in jobflow-auth uses Passport locally (has the JWT secret, can verify the token itself). The one in libs is for other services (jobflow-jobs) that don't have the JWT secret — they can't verify tokens themselves. Instead they call the auth service via gRPC and ask "is this token valid?"
The flow:

Request hits jobflow-jobs with cookie Authentication: <jwt>
This guard extracts the token from the cookie
Calls authService.authenticate({ token }) via gRPC — sends to jobflow-auth
jobflow-auth verifies the token, returns the User object
Guard sets req.user = res (the full user object)
Returns true — request proceeds

catchError returns of(false) — if auth service is down or token is invalid, the guard returns false (unauthorized) instead of crashing.

*/
