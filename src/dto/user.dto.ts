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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email_address: string;

  @IsString()
  @IsOptional()
  github_link: string;

  @IsString()
  @IsOptional()
  portfolio_website: string;

  @IsArray()
  @IsOptional()
  tech_stacks: string[];

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  schedule: string;

  @IsString()
  @IsOptional()
  position: string;
}

export class IUpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

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

export class LoginAdminDto {
  @IsEmail()
  email_address: string;

  @IsNotEmpty()
  password: string;
}

export class ICreateMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  email_address: string;

  @IsString()
  @IsOptional()
  github_link: string;

  @IsString()
  @IsOptional()
  portfolio_website: string;

  @IsString()
  @IsOptional()
  tech_stacks: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  schedule: string;

  @IsString()
  @IsOptional()
  position: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEmail()
  @IsOptional()
  email_address?: string;

  @IsString()
  @IsOptional()
  phone_no?: string;

  @IsUrl()
  @IsOptional()
  github_link?: string;

  @IsUrl()
  @IsOptional()
  fb_link?: string;

  @IsUrl()
  @IsOptional()
  linkedin_link?: string;

  @IsString()
  @IsOptional()
  whatsapp_link?: string;

  @IsString()
  @IsOptional()
  skype_link: string;

  @IsString()
  @IsOptional()
  telegram_link: string;

  @IsString()
  @IsOptional()
  portfolio_website?: string;

  @IsArray()
  @IsOptional()
  tech_stacks?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  schedule?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  short_bio?: string;

  @IsUrl()
  @IsOptional()
  image_icon?: string;
}

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  email_address: string;
}

export class changePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
export class WorkExpDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsOptional()
  short_desc: string;
}
