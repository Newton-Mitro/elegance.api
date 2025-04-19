// src/common/exceptions/service-not-available.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionName } from '../enums/exception.enum';

export class ServiceNotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The service is not available.',
        error: ExceptionName.ServiceNotAvailable,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
