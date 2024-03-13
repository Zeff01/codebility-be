import { $Enums } from "@prisma/client";
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

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  project_name: string;

  @IsString()
  @IsNotEmpty()
  github_link: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  live_link: string;

  @IsString()
  @IsNotEmpty()
  project_thumbnail: string;

  // @IsArray()
  // @IsNotEmpty()
  // userId: string[];

  @IsString()
  @IsOptional()
  clientId: string;
}

export class UpdateProjectDto {
  // @IsString()
  // @IsOptional()
  // id: string;

  @IsString()
  @IsOptional()
  project_name?: string;

  @IsString()
  @IsOptional()
  github_link?: string;

  @IsString()
  @IsOptional()
  live_link?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  project_thumbnail?: string;

  // @IsArray()
  // @IsOptional()
  // user_id: string[];

  @IsString()
  @IsOptional()
  clientId?: string;

 
}

export class AddUsersToProjectDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsNotEmpty()
  user_id: string[];

  @IsString()
  @IsNotEmpty()
  projectId: string;

}