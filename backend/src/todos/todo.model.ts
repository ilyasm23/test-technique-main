import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TodoModel {
  @Field()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  content!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  //TODO : Add a verification that the priority equals 'low', 'medium' or 'high' only.
  priority!: string;

  @Field({ nullable: true })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message:
      'The execution_date must be in the ISO 8601 format and must include the time (2023-09-25T14:00:00.000Z).',
  })
  execution_date?: string;
}

export class TodoResponse {
  id!: number;
  title!: string;
  content!: string;
  priority!: string;
  execution_date?: string;
}
