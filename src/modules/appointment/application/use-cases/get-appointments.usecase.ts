import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { AppointmentDto } from '../dto/appointment.dto';
import { AppointmentStatus } from '../../domain/enums/appointment-status.enum';

export interface GetAppointmentsQueryParams {
  skip?: number;
  take?: number;
  userId?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

@Injectable()
export class GetAppointmentsUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(params: GetAppointmentsQueryParams): Promise<AppointmentDto[]> {
    const { skip, take, userId, status, fromDate, toDate } = params;

    // Build where conditions
    const where: Prisma.AppointmentWhereInput = {};

    if (userId) {
      where.userId = userId;
    }

    if (status) {
      where.status = status as AppointmentStatus;
    }

    if (fromDate || toDate) {
      where.appointmentTime = {};

      if (fromDate) {
        where.appointmentTime.gte = new Date(fromDate);
      }

      if (toDate) {
        where.appointmentTime.lte = new Date(toDate);
      }
    }

    const appointments = await this.appointmentRepository.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      where,
      orderBy: { appointmentTime: 'asc' },
    });

    return appointments.map((appointment) => ({
      id: appointment.id.toString(),
      userId: appointment.userId,
      appointmentTime: appointment.appointmentTime,
      isWalkIn: appointment.isWalkIn,
      status: appointment.status,
      services:
        appointment.services?.map((service) => ({
          id: service.id.toString(),
          serviceId: service.serviceId,
          price: service.price,
        })) || [],
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }));
  }
}
