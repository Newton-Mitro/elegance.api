import { Appointment, AppointmentService } from '@prisma/client';
import { AppointmentServiceEntity } from '../../domain/entities/appointment-service.entity';
import { AppointmentEntity } from '../../domain/entities/appointmet.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

type AppointmentWithServices = Appointment & {
  services?: AppointmentService[];
};

export class AppointmentMapper {
  static toDomain(raw: AppointmentWithServices): AppointmentEntity {
    const services = raw.services?.map((service) =>
      AppointmentServiceEntity.create(
        {
          appointmentId: service.appointmentId,
          serviceId: service.serviceId,
          price: service.price,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt,
        },
        new UniqueEntityID(service.id),
      ),
    );

    return AppointmentEntity.create(
      {
        userId: raw.userId || undefined,
        appointmentTime: raw.appointmentTime,
        isWalkIn: raw.isWalkIn,
        status: raw.status,
        services,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPersistence(entity: AppointmentEntity): Appointment {
    return {
      id: entity.id.toString(),
      userId: entity.userId ?? null,
      appointmentTime: entity.appointmentTime,
      isWalkIn: entity.isWalkIn,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
