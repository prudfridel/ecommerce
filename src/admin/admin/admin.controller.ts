import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, LoginDto } from '../dto/create.dto';

@Controller('api/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('create')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.adminService.login(dto);
  }
}
