import { $Enums, ClientStatusEnum } from "@prisma/client";
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

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsOptional()
  company_logo: string;

  @IsString()
  @IsOptional()
  client_start_time: string;

  @IsString()
  @IsOptional()
  client_end_time: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  contact_number: string;

  @IsString()
  @IsOptional()
  linkedin_link: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsArray()
  @IsOptional()
  company_hist: string[];
}

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  company_name: string;

  @IsString()
  @IsOptional()
  company_logo: string;

  @IsString()
  @IsOptional()
  client_start_time: string;

  @IsString()
  @IsOptional()
  client_end_time: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  contact_number: string;

  @IsString()
  @IsOptional()
  linkedin_link: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsArray()
  @IsOptional()
  company_hist: string[];

  // @IsString()
  // @IsOptional()
  // portfolio_website?: string;

  // @IsString()
  // @IsOptional()
  // tech_stacks?: string;

  // @IsString()
  // @IsOptional()
  // password?: string;

  // @IsString()
  // @IsOptional()
  // schedule?: string;

  // @IsString()
  // @IsOptional()
  // position?: string;
}

export class UpdateUsersToClientDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsNotEmpty()
  usersClientId: string[];

  @IsString()
  @IsNotEmpty()
  clientsId: string;
}

export class UpdateClientsToArchiveDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(ClientStatusEnum)
  statusType: string;
}
