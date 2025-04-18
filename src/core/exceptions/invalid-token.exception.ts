// src/common/exceptions/invalid-token.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'The authentication token is invalid or expired.',
        error: 'invalid_token',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
