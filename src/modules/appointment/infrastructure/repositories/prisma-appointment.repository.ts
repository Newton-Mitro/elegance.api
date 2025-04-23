import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AppointmentEntity } from '../../domain/entities/appointmet.entity';
import { AppointmentMapper } from '../mappers/appointment.mapper';

@Injectable()
export class PrismaAppointmentRepository implements IAppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<AppointmentEntity | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: id.toString() },
      include: { services: true },
    });

    return appointment ? AppointmentMapper.toDomain(appointment) : null;
  }

  async findByUserId(userId: string): Promise<AppointmentEntity[]> {
    const appointments = await this.prisma.appointment.findMany({
      where: { userId },
      include: { services: true },
    });

    return appointments.map((appointment) =>
      AppointmentMapper.toDomain(appointment),
    );
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<AppointmentEntity[]> {
    const appointments = await this.prisma.appointment.findMany({
      skip: params?.skip,
      take: params?.take,
      where: params?.where,
      orderBy: params?.orderBy,
      include: { services: true },
    });

    return appointments.map((appointment) =>
      AppointmentMapper.toDomain(appointment),
    );
  }

  async save(
    appointment: AppointmentEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = tx || this.prisma;
    const data = AppointmentMapper.toPersistence(appointment);

    await prisma.appointment.upsert({
      where: { id: appointment.id.toString() },
      update: {
        userId: data.userId,
        appointmentTime: data.appointmentTime,
        isWalkIn: data.isWalkIn,
        status: data.status,
      },
      create: data,
    });

    // Handle services if they exist
    if (appointment.services && appointment.services.length > 0) {
      // First, delete any services that might have been removed
      await prisma.appointmentService.deleteMany({
        where: { appointmentId: appointment.id.toString() },
      });

      // Then create all services
      for (const service of appointment.services) {
        await prisma.appointmentService.create({
          data: {
            id: service.id.toString(),
            appointmentId: appointment.id.toString(),
            serviceId: service.serviceId,
            price: service.price,
          },
        });
      }
    }
  }

  async delete(
    id: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = tx || this.prisma;

    // First delete related services
    await prisma.appointmentService.deleteMany({
      where: { appointmentId: id.toString() },
    });

    // Then delete the appointment
    await prisma.appointment.delete({
      where: { id: id.toString() },
    });
  }
}
