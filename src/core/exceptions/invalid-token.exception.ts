// src/common/exceptions/invalid-token.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class InvalidTokenException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'The authentication token is invalid or expired.',
        error: ExceptionName.InvalidToken,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
