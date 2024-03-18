import { $Enums, ProjectViewTypeEnum } from "@prisma/client";
import { Type } from "class-transformer";
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
  ValidateNested,
  ArrayUnique,
} from "class-validator";

export class CreateProjectDto {
  //   @IsString()
  // @IsOptional()
  // projectsId?: string;
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

  @IsString()
  @IsOptional()
  clientId: string;

  // @IsArray()
  //  @IsOptional()
  // email_address: string[];

  @IsArray()
  // @IsString({ each: true })
  // @ArrayUnique()
  users: UserDto[];
}

export class UserDto {
  @IsString()
  usersId: string;
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

  @IsString()
  @IsOptional()
  clientId?: string;

  @IsArray()
  @IsOptional()
  users: UserProjectsDto[];
}
export class UserProjectsDto {
  @IsString()
  id: string;
}

export class UpdateUsersToProjectDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;
  @IsOptional()
  @IsEnum(ProjectViewTypeEnum)
  viewType: string;

  @IsArray()
  @IsOptional()
  users: AddUserToProjectsDto[];

  @IsString()
  @IsNotEmpty()
  projectsId: string;
}
export class AddUserToProjectsDto {
  @IsString()
  usersId: string;
}
