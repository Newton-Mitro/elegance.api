// src/common/exceptions/unauthorized-access.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedAccessException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to access this resource.',
        error: 'unauthorized_access',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
