import { AbstractModel } from '@jobflow/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
    @Field()
    email: string;
}

//The @ObjectType() decorator is the core tool NestJS uses to translate a standard TypeScript class into a formal GraphQL Type