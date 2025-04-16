import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntityMapper } from '../mappers/user.mapper';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<UserEntity | null> {
    const dbUsers = await this.prisma.user.findUnique({
      where: { id: id.toString() },
      include: { roles: { include: { role: true } } },
    });

    return dbUsers ? UserEntityMapper.toDomain(dbUsers) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { phone },
      include: { roles: { include: { role: true } } },
    });

    return user ? UserEntityMapper.toDomain(user) : null;
  }

  async save(user: UserEntity): Promise<void> {
    const data = UserEntityMapper.toPersistence(user);

    await this.prisma.user.upsert({
      where: { id: user.id.toString() },
      update: data,
      create: data,
    });

    // Optionally update roles if needed
  }

  async delete(id: UniqueEntityID): Promise<void> {
    await this.prisma.user.delete({ where: { id: id.toString() } });
  }
}
