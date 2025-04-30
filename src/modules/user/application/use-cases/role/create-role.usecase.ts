import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { RoleEntity } from '../../../domain/entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject('IRoleRepository')
    private readonly repo: IRoleRepository,
  ) {}

  async execute(data: { name: string; description?: string }) {
    const role = RoleEntity.create({
      name: data.name,
      description: data.description,
    });
    return this.repo.create(role);
  }
}
