import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto, UpdateServiceDto } from '../dto/service.dto';
@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  // Ajouter un service, adminId vient du payload (ex: user connecté)
  async create(createServiceDto: CreateServiceDto, adminId: string) {
    return await this.prisma.services.create({
      data: {
        ...createServiceDto,
        adminId,
      },
    });
  }

  // Modifier un service, on vérifie que le service appartient bien à l'admin
  async update(id: string, updateServiceDto: UpdateServiceDto, adminId: string) {
    const service = await this.prisma.services.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service non trouvé');
    if (service.adminId !== adminId) throw new ForbiddenException('Pas autorisé');

    return await this.prisma.services.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  // Supprimer un service, avec vérification d’appartenance
  async remove(id: string, adminId: string) {
    const service = await this.prisma.services.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service non trouvé');
    if (service.adminId !== adminId) throw new ForbiddenException('Pas autorisé');

    return await this.prisma.services.delete({ where: { id } });
  }

  // Récupérer tous les services d’un admin
  async findAll(adminId: string) {
    return await this.prisma.services.findMany({
      where: { adminId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Récupérer un service par son id, vérif admin
  async findOne(id: string, adminId: string) {
    const service = await this.prisma.services.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service non trouvé');
    if (service.adminId !== adminId) throw new ForbiddenException('Pas autorisé');

    return service;
  }
}
