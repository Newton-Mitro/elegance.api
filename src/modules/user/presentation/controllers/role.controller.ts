import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateRoleUseCase } from '../../application/use-cases/role/create-role.usecase';
import { UpdateRoleUseCase } from '../../application/use-cases/role/update-role.usecase';
import { DeleteRoleUseCase } from '../../application/use-cases/role/delete-role.usecase';
import { GetRoleByIdUseCase } from '../../application/use-cases/role/get-role-by-id.usecase';
import { GetAllRolesUseCase } from '../../application/use-cases/role/get-all-roles.usecase';
import { CreateRoleDto } from '../../application/dto/role/create-role.dto';
import { UpdateRoleDto } from '../../application/dto/role/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly getRoleByIdUseCase: GetRoleByIdUseCase,
    private readonly getAllRolesUseCase: GetAllRolesUseCase,
  ) {}

  @Post()
  async createRole(@Body() dto: CreateRoleDto, @Res() res: Response) {
    const result = await this.createRoleUseCase.execute(dto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Role successfully created.',
      data: result,
    });
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
    @Res() res: Response,
  ) {
    const result = await this.updateRoleUseCase.execute(id, dto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Role successfully updated.',
      data: result,
    });
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<{
    statusCode: number;
    message: string;
  }> {
    await this.deleteRoleUseCase.execute(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Role successfully deleted.',
    };
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string, @Res() res: Response) {
    const result = await this.getRoleByIdUseCase.execute(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Role successfully fetched.',
      data: result,
    });
  }

  @Get()
  async getAllRoles(@Res() res: Response) {
    const result = await this.getAllRolesUseCase.execute();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Roles successfully fetched.',
      data: result,
    });
  }
}
