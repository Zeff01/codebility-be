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
  IsBoolean,
} from "class-validator";

export class CreateChecklistDto {
  @IsString({ message: "Title must be a string" })
  @IsNotEmpty({ message: "Title cannot be empty" })
  title: string;

  @IsString({ message: "Full description must be a string" })
  @IsOptional()
  full_description: string;

  @IsDateString()
  @IsNotEmpty({ message: "Due Time cannot be empty" })
  due_time: string;
}

export class UpdateChecklistDto {
  @IsString({ message: "Title must be a string" })
  @IsNotEmpty({ message: "Title cannot be empty" })
  title: string;

  @IsString({ message: "Full description must be a string" })
  @IsOptional()
  full_description?: string;

  @IsDateString()
  @IsNotEmpty({ message: "Due Time cannot be empty" })
  due_time: string;

  @IsBoolean()
  @IsOptional()
  accomplished?: boolean;
}

export class ChecklistDetailsDto {
  @IsString({ message: "ID must be a string" })
  id: string;
}
