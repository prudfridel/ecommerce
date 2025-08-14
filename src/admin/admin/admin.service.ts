import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminDto, LoginDto } from '../dto/create.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(private prisma: PrismaService, private jwtService: JwtService,) { }

    async createAdmin(dto: CreateAdminDto) {
        const existingAdmin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });

        if (existingAdmin) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.admin.create({
            data: {
                email: dto.email,
                prenom: dto.prenom,
                nom: dto.nom,
                telephone: dto.telephone,
                password: hashedPassword,
            },
        });
    }
    private excludePassword(admin: any) {
        const { password, ...rest } = admin;
        return rest;
    }


    async login(dto: LoginDto) {
        const admin = await this.prisma.admin.findUnique({
            where: { email: dto.email },
        });

        if (!admin) {
            throw new UnauthorizedException('Email ou mot de passe invalide');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe invalide');
        }

        const payload = { sub: admin.id, email: admin.email };

        return {
            access_token: this.jwtService.sign(payload),
            ...this.excludePassword(admin),
        };
    }
}
