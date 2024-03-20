import { $Enums, PriorityLevelEnum } from "@prisma/client";
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  IsArray,
  isString,
  IsDate,
  IsDateString,
} from "class-validator";

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  subheader: string;

  @IsString()
  @IsOptional()
  full_description: string;

  @IsEnum(PriorityLevelEnum)
  prio_level: string;

  @IsString()
  @IsOptional()
  github_link: string;

  @IsArray()
  tags: TagsDto[];
}
export class TagsDto {
  @IsString()
  tag: string;
}
export class CreateTagTodoDto {
  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  todoId: string;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(PriorityLevelEnum)
  @IsOptional()
  prio_level: PriorityLevelEnum;

  @IsString()
  @IsOptional()
  subheader: string;

  @IsString()
  @IsOptional()
  full_description: string;

  @IsString()
  @IsOptional()
  github_link: string;


  @IsArray()
  @IsOptional()
  tags: UpdateTagsDto[];
}
export class UpdateTagsDto {
  @IsString()
  id: string;
}

