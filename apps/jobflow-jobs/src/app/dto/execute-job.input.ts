import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ExecuteJobInput {
  @Field()
  @IsNotEmpty()
  name: string;
}

/*

This is a GraphQL input type — it's what the frontend sends when calling the executeJob mutation. It has decorators for:

@InputType() — registers it in the GraphQL schema
@IsNotEmpty() — validation that runs via ValidationPipe

They serve different layers: JobMetadata is internal system data; ExecuteJobInput is the API contract with the outside world.

*/
