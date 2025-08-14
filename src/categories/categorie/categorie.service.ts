import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto, adminId: string) {
    return this.prisma.category.create({
      data: {
        name: dto.name,
        adminId,
        description : dto.description
      },
    });
  }

  async findAll(adminId: string) {
    return this.prisma.category.findMany({
      where: { adminId },
      include: { products: true },
    });
  }

  async findOne(id: string, adminId: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) throw new NotFoundException('Category not found');
    if (category.adminId !== adminId) throw new ForbiddenException('Access denied');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto, adminId: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    if (category.adminId !== adminId) throw new ForbiddenException('Access denied');

    return this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, adminId: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    if (category.adminId !== adminId) throw new ForbiddenException('Access denied');

    return this.prisma.category.delete({ where: { id } });
  }
}
