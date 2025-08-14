import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateAdminDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    prenom: string;

    @IsNotEmpty()
    nom: string;

    @IsOptional()
    telephone: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
