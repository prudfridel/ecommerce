import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';// adapte le chemin selon ton projet
import { ServiceService } from './service.service';// chemin vers ton décorateur
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateServiceDto, UpdateServiceDto } from '../dto/service.dto';

@UseGuards(JwtAuthGuard) // sécurise toutes les routes
@Controller('api/service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Req() req : any
  ) {
    return this.serviceService.create(createServiceDto, req.user['id']);
  }

  @Get()
  async findAll(@Req() req : any) {

    return this.serviceService.findAll(req.user['id']);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req : any
  ) {
    return this.serviceService.findOne(id, req.user['id']);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Req() req : any
  ) {
    return this.serviceService.update(id, updateServiceDto, req.user['id']);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req : any
  ) {
    return this.serviceService.remove(id, req.user['id']);
  }
}
