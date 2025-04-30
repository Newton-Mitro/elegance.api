import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../../domain/repositories/role.repository';

@Injectable()
export class GetRoleByIdUseCase {
  constructor(
    @Inject('IRoleRepository')
    private readonly repo: IRoleRepository,
  ) {}

  async execute(id: string) {
    return this.repo.findById(id);
  }
}
