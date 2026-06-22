import { UsersService } from './users.service';
import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { User } from './models/user.model';

@Resolver(()=> User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService){}

    @Query(()=> [User], {name: 'users'})
    async getUsers(){

    }

    @Mutation(()=> User) 
    async createUser( ){}
}

