// src/common/exceptions/invalid-credentials.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials provided.',
        error: 'invalid_credentials',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
