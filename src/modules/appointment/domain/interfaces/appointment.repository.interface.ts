import { Prisma } from '@prisma/client';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { AppointmentEntity } from '../entities/appointmet.entity';

export interface IAppointmentRepository {
  findById(id: UniqueEntityID): Promise<AppointmentEntity | null>;
  findByUserId(userId: string): Promise<AppointmentEntity[]>;
  findAll(params?: {
    skip?: number;
    take?: number;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<AppointmentEntity[]>;
  save(
    appointment: AppointmentEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void>;
  delete(id: UniqueEntityID, tx?: Prisma.TransactionClient): Promise<void>;
}
