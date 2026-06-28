import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true }) // If you don't write isAbstract:true this messy code will also be exposed to FE
export class AbstractModel {
  @Field(() => ID)
  id: number;
}
