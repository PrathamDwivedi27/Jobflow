import { PrismaService } from './../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    async createUser(data: CreateUserInput){
        const hashedPassword = await hash(data.password, 10);

        return this.prismaService.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });
    }

    async getUsers(){
        return this.prismaService.user.findMany();
    }
}
