import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    GqlExecutionContext.create(context).getContext().req.user,
);

/*
After GqlAuthGuard runs, req.user contains the payload. 
This decorator is a convenience shortcut — instead of writing @Context() ctx and then ctx.req.user in every resolver, you write @CurrentUser() user. Clean and reusable.

*/
