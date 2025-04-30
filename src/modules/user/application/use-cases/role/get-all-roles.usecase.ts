import { Inject, Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../../domain/repositories/role.repository';

@Injectable()
export class GetAllRolesUseCase {
  constructor(
    @Inject('IRoleRepository')
    private readonly repo: IRoleRepository,
  ) {}

  async execute() {
    return this.repo.findAll();
  }
}
