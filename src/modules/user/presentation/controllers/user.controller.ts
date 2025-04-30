import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { Role } from '../../../../core/enums/role.enum';

import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { Response } from 'express';

import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { GetUserByIdUseCase } from '../../application/use-cases/get-user-by-id.usecase';
import { GetAllUsersUseCase } from '../../application/use-cases/get-all-users.usecase';
import { UserFilter } from '../../domain/repositories/user.repository';
import { UserProps } from '../../domain/entities/user.entity';
import { SortOrder } from '../../../../core/types/sort_order.type';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
  ) {}

  @Post()
  // @Roles(Role.ADMIN)
  async createUser(@Body() dto: CreateUserDto, @Res() res: Response) {
    const result = await this.createUserUseCase.execute(dto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'User successfully created.',
      data: result,
    });
  }

  @Put(':id')
  // @Roles(Role.ADMIN)
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.updateUserUseCase.execute(id, dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully updated.',
      data: result,
    });
  }

  @Delete(':id')
  // @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string): Promise<{
    statusCode: number;
    message: string;
  }> {
    await this.deleteUserUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User successfully deleted.',
    };
  }

  @Get(':id')
  // @Roles(Role.ADMIN, Role.RECEPTIONIST)
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getUserByIdUseCase.execute(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User successfully fetched.',
      data: result,
    });
  }

  @Get()
  // @Roles(Role.ADMIN)
  async getAllUsers(
    @Res() res: Response,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('filter') filter?: UserFilter,
    @Query('sortBy') sortBy?: keyof UserProps,
    @Query('sortOrder') sortOrder?: SortOrder,
  ) {
    const result = await this.getAllUsersUseCase.execute({
      page,
      limit,
      filter,
      sortBy,
      sortOrder,
    });

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Users successfully fetched.',
      data: result.data,
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  }
}
