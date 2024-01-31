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
} from "class-validator";

export class CreateTimeDto {
  @IsString()
  @IsNotEmpty()
  userTimeLogId: string;
}

// export class UpdateUserDto {
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
//   github_link?: string;

//   // @IsString()
//   // @IsOptional()
//   // portfolio_website?: string;

//   // @IsString()
//   // @IsOptional()
//   // tech_stacks?: string;

//   // @IsString()
//   // @IsOptional()
//   // password?: string;

//   // @IsString()
//   // @IsOptional()
//   // schedule?: string;

//   // @IsString()
//   // @IsOptional()
//   // position?: string;
// }

// export class LoginAdminDto {
//   @IsEmail()
//   email_address: string;

//   @IsNotEmpty()
//   password: string;
// }

// export class ICreateMemberDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   firstName: string;

//   @IsString()
//   lastName: string;

//   @IsString()
//   @IsUrl()
//   profilePic: string;
// }
