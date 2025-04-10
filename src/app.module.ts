import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederService } from './seed/seeder.service';
import { PrismaModule } from './prisma/prisma.module';
import { SeedModule } from './seed/seed.module';
import { PrismaService } from './prisma/prisma.service';
import { ServiceModule } from './service/service.module';
import { BeautyServiceModule } from './beauty-service/beauty-service.module';

@Module({
  imports: [PrismaModule, SeedModule, ServiceModule, BeautyServiceModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, SeederService],
})
export class AppModule {}
