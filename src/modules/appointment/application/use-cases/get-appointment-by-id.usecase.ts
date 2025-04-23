import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AppointmentDto } from '../dto/appointment.dto';

@Injectable()
export class GetAppointmentByIdUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
  ) {}

  async execute(id: string): Promise<AppointmentDto> {
    const appointmentId = new UniqueEntityID(id);
    const appointment =
      await this.appointmentRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return {
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
    };
  }
}
