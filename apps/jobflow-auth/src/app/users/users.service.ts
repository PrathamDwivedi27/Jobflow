import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserInput) {
    const hashedPassword = await hash(data.password, 10);

    return this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: args,
    });
  }
}

/*

Prisma.UserWhereUniqueInput is a Prisma-generated type that only accepts fields marked @unique in your schema (like id or email). 
This makes the function flexible — you can call getUser({ email }) or getUser({ id }) and both work

*/
