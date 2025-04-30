import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { RoleEntity } from '../../../domain/entities/role.entity';
import { UniqueEntityID } from '../../../../../core/entities/unique-entity-id';

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    @Inject('IRoleRepository')
    private readonly repo: IRoleRepository,
  ) {}

  async execute(id: string, data: { name?: string; description?: string }) {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error('Role not found');

    const updated = RoleEntity.create(
      {
        name: data.name ?? existing.name,
        description: data.description ?? existing.description,
      },
      new UniqueEntityID(id),
    );

    return this.repo.update(updated);
  }
}
