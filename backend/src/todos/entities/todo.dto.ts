import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class TodoDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsNotEmpty()
  @IsString()
  priority!: string;

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message:
      'The executionDate must be in the ISO 8601 format and must include the time (2023-09-25T14:00:00.000Z).',
  })
  executionDate?: string;
}

export class TodoResponse {
  id!: number;
  title!: string;
  content!: string;
  priority!: string;
  executionDate?: Date;
}
