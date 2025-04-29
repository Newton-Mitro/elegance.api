import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { Public } from '../../../../core/decorators/public.decorator';

import { UserAggregateDto } from '../../application/dto/user-aggregate.dto';
import { UserDto } from '../../application/dto/user.dto';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.usecase';

@Controller('user')
@UseGuards(AuthGuard, RolesGuard)
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  async createUser(@Body() dto: CreateUserDto): Promise<UserAggregateDto> {
    const result = await this.createUserUseCase.execute(dto);

    return result;
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserAggregateDto> {
    const result = await this.updateUserUseCase.execute(id, dto);
    return result;
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<void> {
    const result = await this.deleteUserUseCase.execute(id);

    return result;
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async getUserById(@Param('id') id: string): Promise<UserAggregateDto> {
    const result = await this.getUserByIdUseCase.execute(id);
    return result;
  }

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('search') search?: string,
  ): Promise<{
    data: UserDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const result = await this.getAllUsersUseCase.execute({
      page,
      limit,
      search,
    });

    return result;
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<UserAggregateDto> {
    const payload = { ...dto, role: Role.CUSTOMER };
    const result = await this.createUserUseCase.execute(payload);

    return result;
  }
}
