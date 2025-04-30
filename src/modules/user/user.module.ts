import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { PrismaUserRoleRepository } from './infrastructure/repositories/prisma-user-role.repository';
import { PrismaRoleRepository } from './infrastructure/repositories/prisma-role.repository';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './presentation/controllers/role.controller';
import { CreateRoleUseCase } from './application/use-cases/role/create-role.usecase';
import { UpdateRoleUseCase } from './application/use-cases/role/update-role.usecase';
import { DeleteRoleUseCase } from './application/use-cases/role/delete-role.usecase';
import { GetRoleByIdUseCase } from './application/use-cases/role/get-role-by-id.usecase';
import { GetAllRolesUseCase } from './application/use-cases/role/get-all-roles.usecase';
import { CreateUserUseCase } from './application/use-cases/user/create-user.usecase';
import { DeleteUserUseCase } from './application/use-cases/user/delete-user.usecase';
import { GetAllUsersUseCase } from './application/use-cases/user/get-all-users.usecase';
import { GetUserByIdUseCase } from './application/use-cases/user/get-user-by-id.usecase';
import { UpdateUserUseCase } from './application/use-cases/user/update-user.usecase';

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
    CreateRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    GetRoleByIdUseCase,
    GetAllRolesUseCase,
  ],
  controllers: [UserController, RoleController],
  exports: ['IUserRepository', 'IUserRoleRepository', 'IRoleRepository'],
})
export class UserModule {}
