import {
  Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './categorie.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @Request() req : any) {
    console.log(req.user['id']);
    
    return this.categoryService.create(dto, req.user['id']);
  }

  @Get()
  findAll(@Request() req : any) {
    return this.categoryService.findAll(req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req : any) {
    return this.categoryService.findOne(id, req.user['id']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @Request() req : any) {
    return this.categoryService.update(id, dto, req.user['id']);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req : any) {
    return this.categoryService.remove(id, req.user['id']);
  }
}
