import { Decimal } from '@prisma/client/runtime/library';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';

export interface AppointmentServiceProps {
  appointmentId: string;
  serviceId: string;
  price: Decimal | number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AppointmentServiceEntity extends Entity<AppointmentServiceProps> {
  private constructor(props: AppointmentServiceProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: AppointmentServiceProps,
    id?: UniqueEntityID,
  ): AppointmentServiceEntity {
    return new AppointmentServiceEntity(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );
  }

  get appointmentId(): string {
    return this.props.appointmentId;
  }

  get serviceId(): string {
    return this.props.serviceId;
  }

  get price(): Decimal | number {
    return this.props.price;
  }
}
