import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateLevelsDto {
  @IsString()
  name: string;

  // @IsString()
  // @IsOptional()
  // created_by : string;
}

export class CreateThresholdDto {
  @IsString()
  levelID: string;

  @IsNumber()
  threshold: number;
}

export class CreatePointDto {
  @IsString()
  userId: string;

  @IsNumber()
  point: number;
}
