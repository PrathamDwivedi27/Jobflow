import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

/*

The problem: Passport's AuthGuard expects an HTTP ExecutionContext. But GraphQL resolvers don't expose the raw HTTP request the same way. 
You override getRequest() to manually dig into the GQL context and return the Express req object.
Without this override, Passport can't find the cookie and the guard always fails.
Used on UsersResolver.getUsers() — protects that query so only logged-in users can fetch all users.

*/
