import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../../domain/repositories/role.repository';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @Inject('IRoleRepository')
    private readonly repo: IRoleRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
