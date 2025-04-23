import { AppointmentStatus } from '@prisma/client';
import { Entity } from '../../../../core/entities/entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AppointmentServiceEntity } from './appointment-service.entity';

export interface AppointmentProps {
  userId?: string;
  appointmentTime: Date;
  isWalkIn: boolean;
  status: AppointmentStatus;
  services?: AppointmentServiceEntity[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class AppointmentEntity extends Entity<AppointmentProps> {
  private constructor(props: AppointmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(
    props: AppointmentProps,
    id?: UniqueEntityID,
  ): AppointmentEntity {
    return new AppointmentEntity(
      {
        ...props,
        createdAt: props.createdAt || new Date(),
        updatedAt: props.updatedAt || new Date(),
      },
      id,
    );
  }

  get userId(): string | undefined {
    return this.props.userId;
  }

  get appointmentTime(): Date {
    return this.props.appointmentTime;
  }

  get isWalkIn(): boolean {
    return this.props.isWalkIn;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get services(): AppointmentServiceEntity[] | undefined {
    return this.props.services;
  }

  public updateStatus(status: AppointmentStatus): void {
    this.props.status = status;
    this.props.updatedAt = new Date();
  }

  public reschedule(newTime: Date): void {
    this.props.appointmentTime = newTime;
    this.props.updatedAt = new Date();
  }

  public addService(service: AppointmentServiceEntity): void {
    if (!this.props.services) {
      this.props.services = [];
    }
    this.props.services.push(service);
    this.props.updatedAt = new Date();
  }
}
