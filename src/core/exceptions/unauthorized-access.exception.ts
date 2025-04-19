// src/common/exceptions/unauthorized-access.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to access this resource.',
        error: ExceptionName.UnauthorizedAccess,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
