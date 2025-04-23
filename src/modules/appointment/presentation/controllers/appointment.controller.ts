import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateAppointmentUseCase } from '../../application/use-cases/create-appointment.usecase';
import { UpdateAppointmentStatusUseCase } from '../../application/use-cases/update-appointment-status.usecase';
import { GetAppointmentByIdUseCase } from '../../application/use-cases/get-appointment-by-id.usecase';
import {
  GetAppointmentsUseCase,
  GetAppointmentsQueryParams,
} from '../../application/use-cases/get-appointments.usecase';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { CreateAppointmentDto } from '../../application/dto/create-appointment.dto';
import { UpdateAppointmentStatusDto } from '../../application/dto/update-appointment-status.dto';
import { DeleteAppointmentUseCase } from '../../application/use-cases/delete-appointment.usecase';
import { Role } from '../../../../core/enums/role.enum';

@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly updateAppointmentStatusUseCase: UpdateAppointmentStatusUseCase,
    private readonly getAppointmentByIdUseCase: GetAppointmentByIdUseCase,
    private readonly getAppointmentsUseCase: GetAppointmentsUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.STYLIST)
  async createAppointment(
    @Body() dto: CreateAppointmentDto,
    @Res() res: Response,
  ) {
    try {
      const appointmentId = await this.createAppointmentUseCase.execute(dto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Appointment created successfully',
        data: { id: appointmentId },
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to create appointment',
      });
    }
  }

  @Put('status')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.STYLIST)
  async updateAppointmentStatus(
    @Body() dto: UpdateAppointmentStatusDto,
    @Res() res: Response,
  ) {
    try {
      await this.updateAppointmentStatusUseCase.execute(dto);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Appointment status updated successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to update appointment status',
      });
    }
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.STYLIST, Role.CUSTOMER)
  async getAppointmentById(@Param('id') id: string, @Res() res: Response) {
    try {
      const appointment = await this.getAppointmentByIdUseCase.execute(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Appointment retrieved successfully',
        data: appointment,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: error.message || 'Appointment not found',
      });
    }
  }

  @Get()
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.STYLIST)
  async getAppointments(
    @Query() query: GetAppointmentsQueryParams,
    @Res() res: Response,
  ) {
    try {
      const appointments = await this.getAppointmentsUseCase.execute(query);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Appointments retrieved successfully',
        data: appointments,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to retrieve appointments',
      });
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteAppointment(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.deleteAppointmentUseCase.execute(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Appointment deleted successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to delete appointment',
      });
    }
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, Role.RECEPTIONIST, Role.STYLIST, Role.CUSTOMER)
  async getUserAppointments(
    @Param('userId') userId: string,
    @Res() res: Response,
  ) {
    try {
      const appointments = await this.getAppointmentsUseCase.execute({
        userId,
      });
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'User appointments retrieved successfully',
        data: appointments,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message || 'Failed to retrieve user appointments',
      });
    }
  }
}
