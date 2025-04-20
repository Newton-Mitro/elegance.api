import { PrismaClient, Prisma } from '@prisma/client';
import { ServiceEntity } from '../../domain/entities/service.entity';
import { IServiceRepository } from '../../domain/repositories/service.repository';
import { ServiceMapper } from '../mappers/service.mapper';

export class PrismaServiceRepository implements IServiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    service: ServiceEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const data = ServiceMapper.toPersistence(service);
    const client = tx ?? this.prisma;
    await client.service.create({ data });
  }

  async update(
    service: ServiceEntity,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const data = ServiceMapper.toPersistence(service);
    const client = tx ?? this.prisma;
    await client.service.update({
      where: { id: service.id.toString() },
      data,
    });
  }

  async delete(id: string, tx?: Prisma.TransactionClient): Promise<void> {
    const client = tx ?? this.prisma;
    await client.service.delete({ where: { id } });
  }

  async findById(id: string): Promise<ServiceEntity | null> {
    const service = await this.prisma.service.findUnique({ where: { id } });
    return service ? ServiceMapper.toDomain(service) : null;
  }
}
