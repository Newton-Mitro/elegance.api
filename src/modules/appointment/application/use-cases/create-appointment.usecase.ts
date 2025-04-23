import { Inject, Injectable } from '@nestjs/common';
import { AppointmentServiceEntity } from '../../domain/entities/appointment-service.entity';
import { AppointmentStatus } from '@prisma/client';
import { IAppointmentRepository } from '../../domain/interfaces/appointment.repository.interface';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AppointmentEntity } from '../../domain/entities/appointmet.entity';

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    @Inject('IAppointmentRepository')
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(dto: CreateAppointmentDto): Promise<string> {
    const appointmentId = new UniqueEntityID();

    // Create the appointment entity
    const appointment = AppointmentEntity.create(
      {
        userId: dto.userId,
        appointmentTime: new Date(dto.appointmentTime),
        isWalkIn: dto.isWalkIn,
        status: AppointmentStatus.SCHEDULED,
        services: [],
      },
      appointmentId,
    );

    // Fetch service prices and create appointment service entities
    await this.prisma.$transaction(async (tx) => {
      // Save the appointment first
      await this.appointmentRepository.save(appointment, tx);

      // Process each service
      for (const serviceDto of dto.services) {
        // Get the service to retrieve its price
        const service = await tx.service.findUnique({
          where: { id: serviceDto.serviceId },
        });

        if (service) {
          // Create appointment service entity
          const appointmentService = AppointmentServiceEntity.create({
            appointmentId: appointmentId.toString(),
            serviceId: serviceDto.serviceId,
            price: service.price,
          });

          // Add service to appointment
          appointment.addService(appointmentService);
        }
      }

      // Save the appointment with services
      await this.appointmentRepository.save(appointment, tx);
    });

    return appointmentId.toString();
  }
}
