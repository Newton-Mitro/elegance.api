// src/common/exceptions/service-not-available.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceNotAvailableException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The service is not available.',
        error: 'service_not_available',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
