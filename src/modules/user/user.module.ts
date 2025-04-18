import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { PrismaUserRoleRepository } from './infrastructure/repositories/prisma-user-role.repository';
import { PrismaRoleRepository } from './infrastructure/repositories/prisma-role.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: 'IUserRoleRepository', useClass: PrismaUserRoleRepository },
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IRoleRepository', useClass: PrismaRoleRepository },
  ],
  controllers: [UserController],
  exports: ['IUserRepository', 'IUserRoleRepository', 'IRoleRepository'],
})
export class UserModule {}
