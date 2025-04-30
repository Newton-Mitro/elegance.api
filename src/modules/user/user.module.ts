import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { PrismaUserRoleRepository } from './infrastructure/repositories/prisma-user-role.repository';
import { PrismaRoleRepository } from './infrastructure/repositories/prisma-role.repository';
import { AuthModule } from '../auth/auth.module';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from './application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/delete-user.usecase';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.usecase';
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.usecase';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [
    { provide: 'IUserRoleRepository', useClass: PrismaUserRoleRepository },
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IRoleRepository', useClass: PrismaRoleRepository },
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    GetAllUsersUseCase,
  ],
  controllers: [UserController],
  exports: ['IUserRepository', 'IUserRoleRepository', 'IRoleRepository'],
})
export class UserModule {}
