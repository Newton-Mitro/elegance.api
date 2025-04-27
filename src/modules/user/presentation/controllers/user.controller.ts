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
} from '@nestjs/common';
import { AuthGuard } from '../../../auth/presentation/guards/auth.guard';
import { RolesGuard } from '../../../auth/presentation/guards/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';
import { UserAggregateDto } from '../../application/dto/user-aggregate.dto';
import { UserDto } from '../../application/dto/user.dto';
import { Public } from '../../../../core/decorators/public.decorator';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';

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
    return this.createUserUseCase.execute(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserAggregateDto> {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STAFF)
  async getUserById(@Param('id') id: string): Promise<UserAggregateDto> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ): Promise<{
    data: UserDto[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { users, total } = await this.getAllUsersUseCase.execute({
      page,
      limit,
      search,
    });
    return { data: users, total, page, limit };
  }

  @Public()
  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<UserAggregateDto> {
    const payload = { ...dto, role: Role.CUSTOMER };
    return this.createUserUseCase.execute(payload);
  }
}
