import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [{ provide: 'IUserRepository', useClass: PrismaUserRepository }],
  controllers: [UserController],
  exports: ['IUserRepository'],
})
export class UserModule {}
