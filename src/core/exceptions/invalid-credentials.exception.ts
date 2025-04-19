// src/common/exceptions/invalid-credentials.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials provided.',
        error: ExceptionName.InvalidCredentials,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
