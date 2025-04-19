import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id';
import { UserEntityMapper } from '../mappers/user.mapper';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: UniqueEntityID): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { id: id.toString() },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { phone },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const dbUser = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: { include: { role: true } } },
    });

    return dbUser ? UserEntityMapper.toDomain(dbUser) : null;
  }

  async save(user: UserEntity, tx?: Prisma.TransactionClient): Promise<void> {
    const data = UserEntityMapper.toPersistence(user);
    const prisma = tx ?? this.prisma;

    await prisma.user.upsert({
      where: { id: user.id.toString() },
      update: data,
      create: data,
    });

    // Optionally update roles if needed
  }

  async delete(
    id: UniqueEntityID,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    const prisma = tx ?? this.prisma;

    await prisma.user.delete({ where: { id: id.toString() } });
  }
}
