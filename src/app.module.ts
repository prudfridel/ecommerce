import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { AdminModule } from './admin/admin/admin.module';
import { ProductModule } from './products/product/product.module';
import { CategorieModule } from './categories/categorie/categorie.module';
import { ServiceModule } from './services/service/service.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true, // Important ! Rend le ConfigService accessible partout
  }), AdminModule, ProductModule, CategorieModule, ServiceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
