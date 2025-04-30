import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new Error('User not found');
    }
    await this.userRepo.delete(id);
  }
}
