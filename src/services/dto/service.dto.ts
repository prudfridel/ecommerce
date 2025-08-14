
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


export class CreateServiceDto {
    @IsNotEmpty()
    @IsString()
    img: string;

    @IsNotEmpty()
    @IsString()
    titre: string;

    @IsNotEmpty()
    @IsString()
    desc: string;
}

export class UpdateServiceDto {
    @IsNotEmpty()
    @IsString()
    img: string;

    @IsNotEmpty()
    @IsString()
    titre: string;

    @IsNotEmpty()
    @IsString()
    desc: string;
}

