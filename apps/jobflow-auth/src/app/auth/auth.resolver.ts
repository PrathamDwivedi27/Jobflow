import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { GqlContext } from '@jobflow/nestjs';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext,
  ) {
    return await this.authService.login(loginInput, context.res);
  }
}

/*
GraphQL resolvers are just functions. They receive arguments and return data. 
They don't naturally know about HTTP concepts like cookies or response headers.

So, we provide them context ->
When you initialize Apollo Server in NestJS, you pass a context factory
// Inside GraphQL module setup (usually app.module.ts)
GraphQLModule.forRoot({
  context: ({ req, res }) => ({ req, res }),
})

This attaches Express's req and res to every resolver call. Think of it like a backpack that travels with every GraphQL request 

The resolver's only job: receive the GraphQL mutation, extract arguments, call the service, return the result. It passes context.res to the service so the service can set the cookie. The resolver itself doesn't touch cookie logic — that belongs in the service.

*/
