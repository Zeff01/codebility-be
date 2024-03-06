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

  @IsString()
  @IsOptional()
  tag_name: string;

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

// export class LoginAdminDto {
//   @IsEmail()
//   email_address: string;

//   @IsNotEmpty()
//   password: string;
// }

// export class ICreateMemberDto {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsNotEmpty()
//   address: string;

//   @IsEmail()
//   email_address: string;

//   @IsString()
//   @IsOptional()
//   github_link: string;

//   @IsString()
//   @IsOptional()
//   portfolio_website: string;

//   @IsString()
//   @IsOptional()
//   tech_stacks: string;

//   @IsString()
//   @IsNotEmpty()
//   password: string;

//   @IsString()
//   @IsOptional()
//   schedule: string;

//   @IsString()
//   @IsOptional()
//   position: string;
// }

// export class UpdateUserDto {
//   @IsString()
//   @IsOptional()
//   name?: string;

//   @IsString()
//   @IsOptional()
//   address?: string;

//   @IsEmail()
//   @IsOptional()
//   email_address?: string;

//   @IsString()
//   @IsOptional()
//   phone_no?: string;

//   @IsUrl()
//   @IsOptional()
//   github_link?: string;

//   @IsUrl()
//   @IsOptional()
//   fb_link?: string;

//   @IsUrl()
//   @IsOptional()
//   linkedin_link?: string;

//   @IsString()
//   @IsOptional()
//   whatsapp_link?: string;

//   @IsString()
//   @IsOptional()
//   skype_link: string;

//   @IsString()
//   @IsOptional()
//   telegram_link: string;

//   @IsString()
//   @IsOptional()
//   portfolio_website?: string;

//   @IsArray()
//   @IsOptional()
//   tech_stacks?: string;

//   @IsString()
//   @IsOptional()
//   password?: string;

//   @IsString()
//   @IsOptional()
//   schedule?: string;

//   @IsString()
//   @IsOptional()
//   position?: string;

//   @IsString()
//   @IsOptional()
//   short_bio?: string;

//   @IsUrl()
//   @IsOptional()
//   image_icon?: string;
// }

// export class EmailDto {
//   @IsEmail()
//   @IsNotEmpty()
//   email_address: string;
// }

// export class changePasswordDto {
//   @IsString()
//   @IsNotEmpty()
//   oldPassword: string;

//   @IsString()
//   @IsNotEmpty()
//   newPassword: string;
// }
// export class AddWorkExpDto {
//   @IsString()
//   @IsNotEmpty()
//   user_id: string;

//   @IsString()
//   @IsNotEmpty()
//   position: string;

//   @IsString()
//   @IsNotEmpty()
//   company: string;

//   @IsString()
//   @IsNotEmpty()
//   date: string;

//   @IsString()
//   @IsOptional()
//   short_desc: string;
// }
// export class WorkExpDto {
//   @IsString()
//   @IsNotEmpty()
//   id?: string;

//   @IsString()
//   @IsNotEmpty()
//   position?: string;

//   @IsString()
//   @IsNotEmpty()
//   company?: string;

//   @IsString()
//   @IsNotEmpty()
//   date?: string;

//   @IsString()
//   @IsOptional()
//   short_desc?: string;
// }

// export class UpdateWorkExpDto {
//   @IsString()
//   @IsOptional()
//   position?: string;

//   @IsString()
//   @IsOptional()
//   company?: string;

//   @IsString()
//   @IsOptional()
//   date?: string;

//   @IsString()
//   @IsOptional()
//   short_desc?: string;
// }

// export class UserDto {
//   @IsUUID()
//   @IsNotEmpty()
//   id: string;

//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsString()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @IsNotEmpty()
//   emailVerified: string;

//   @IsString()
//   @IsNotEmpty()
//   image: string;

//   @IsString()
//   @IsNotEmpty()
//   gender: string;

//   @IsString()
//   @IsNotEmpty()
//   address: string;
// }
