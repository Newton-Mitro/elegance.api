import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHasherService {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }
}
