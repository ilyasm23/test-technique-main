import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class TodoModel {
  @Field()
  @IsNumber()
  id!: number;

  @Field()
  @IsString()
  title!: string;

  @Field()
  @IsString()
  content!: string;

  @Field()
  @IsString()
  priority!: string;

  @Field({ nullable: true })
  execution_date?: string;
}

@InputType()
export class TodoPayload {
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
  @IsEnum(['low', 'medium', 'high'], {
    message: 'Priority must be either "low", "medium" or "high"',
  })
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
