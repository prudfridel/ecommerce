import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async createProdcut(dto: CreateProductDto, adminId: string) {
        return this.prisma.product.create({
            data: {
                nom: dto.nom,
                desc: dto.desc,
                prix: dto.prix,
                img: dto.img,
                categoryId: dto.categoryId,
                adminId: adminId
            },
        });
    }

    async findAll() {
        return this.prisma.product.findMany({
            include: {
                category: true, // pour avoir les infos de la catégorie si besoin
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!product) {
            throw new NotFoundException('Produit non trouvé');
        }

        return product;
    }


    async update(id: string, dto: CreateProductDto) {
        const existing = await this.prisma.product.findUnique({ where: { id } });

        if (!existing) {
            throw new NotFoundException('Produit non trouvé');
        }

        return this.prisma.product.update({
            where: { id },
            data: {
                ...dto,
            },
        });
    }

    async remove(id: string) {
        const existing = await this.prisma.product.findUnique({ where: { id } });

        if (!existing) {
            throw new NotFoundException('Produit non trouvé');
        }

        return this.prisma.product.delete({
            where: { id },
        });
    }


}
