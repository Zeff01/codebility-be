import { $Enums, UserJobStatusTypeEnum } from "@prisma/client";
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
  IsInt,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  pronoun: string;

  @IsUrl()
  @IsOptional()
  image_url: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email_address: string;

  @IsMobilePhone()
  @IsOptional()
  phone_no: string;

  @IsUrl()
  @IsOptional()
  github_link: string;

  @IsUrl()
  @IsOptional()
  fb_link: string;

  @IsUrl()
  @IsOptional()
  linkedin_link: string;

  @IsUrl()
  @IsOptional()
  whatsapp_link: string;

  @IsUrl()
  @IsOptional()
  skype_link: string;

  @IsUrl()
  @IsOptional()
  telegram_link: string;

  @IsUrl()
  @IsOptional()
  portfolio_website: string;

  @IsArray()
  @IsOptional()
  tech_stacks: string[];

  @IsString()
  @IsOptional()
  about_me: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  position: string[];

  @IsInt()
  @IsOptional()
  prio?: number;

  @IsDate()
  @IsOptional()
  start_time: Date;

  @IsDate()
  @IsOptional()
  end_time: Date;
}

export class IUpdateUserDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
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

  @IsUrl()
  @IsOptional()
  whatsapp_link?: string;

  @IsUrl()
  @IsOptional()
  skype_link: string;

  @IsUrl()
  @IsOptional()
  telegram_link: string;

  @IsUrl()
  @IsOptional()
  portfolio_website?: string;

  @IsArray()
  @IsOptional()
  tech_stacks?: string;

  @IsArray()
  @IsOptional()
  addtl_skills?: string;

  @IsString()
  @IsOptional()
  schedule?: string;

  @IsArray()
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
export class AddWorkExpDto {
  @IsString()
  @IsNotEmpty()
  userWorkExpId: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  dateFrom: string;

  @IsString()
  @IsNotEmpty()
  dateTo: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @IsNotEmpty()
  task: string[];

  @IsString()
  @IsOptional()
  short_desc: string;
}

export class WorkExpDto {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  position?: string;

  @IsString()
  @IsNotEmpty()
  company?: string;

  @IsString()
  @IsNotEmpty()
  date?: string;

  @IsString()
  @IsOptional()
  short_desc?: string;
}

export class UpdateWorkExpDto {
  @IsString()
  @IsNotEmpty()
  userWorkExpId: string;

  @IsString()
  @IsOptional()
  position: string;

  @IsString()
  @IsOptional()
  company: string;

  @IsString()
  @IsOptional()
  dateFrom: string;

  @IsString()
  @IsOptional()
  dateTo: string;

  @IsString()
  @IsOptional()
  location: string;

  // @IsString({ each: true })
  @IsArray()
  @IsOptional()
  task: string[];

  @IsString()
  @IsOptional()
  short_desc: string;
}

export class UserJobStatusTypeExpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(UserJobStatusTypeEnum)
  jobStatusType: string;
}
