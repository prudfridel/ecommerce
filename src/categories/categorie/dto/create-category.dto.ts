import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

   @IsOptional()
  @IsString()
  description: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}