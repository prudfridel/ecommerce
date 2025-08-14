// create-product.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nom: string;

  @IsString()
  desc?: string;

  @IsNotEmpty()
  @IsNumber()
  prix: number;

  @IsNotEmpty()
  @IsString()
  img: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
